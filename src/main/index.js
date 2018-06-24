'use strict'

import { app, remote, BrowserWindow } from 'electron'

import uuid from 'uuid/v4'
import path from 'path'
import keytar from 'keytar'
import fs from 'fs'

const keytarServiceName = 'SCooP-SCP'
const userDataPath = (app || remote.app).getPath('userData')
const dpath = path.join(userDataPath, 'site-data.json')

global.settings = {
  getSitesConfig: async function () {
    var sites = {}
    try {
      sites = JSON.parse(fs.readFileSync(dpath))
    } catch (error) {
      fs.writeFileSync(dpath, '{}')
    }
    var credentials = await keytar.findCredentials(keytarServiceName)
    var pairedCredentials = {}
    for (var i = 0; i < credentials.length; i++) {
      let cred = credentials[i]
      // clean up any possibly orphaned credentials
      if (!sites.hasOwnProperty(cred.account)) {
        keytar.deletePassword(keytarServiceName, cred.account)
        continue
      }
      pairedCredentials[cred.account] = cred.password
    }
    Object.keys(sites).forEach(function (uuid) {
      if (pairedCredentials.hasOwnProperty(uuid)) {
        sites[uuid]['password'] = pairedCredentials[uuid]
      }
    })
    return sites
  },
  addSite: function (sites, siteData) {
    var siteId = uuid()
    return this.updateSite(sites, siteId, siteData)
  },
  writeSitesConfig: function (sites) {
    return fs.writeFileSync(dpath, JSON.stringify(sites))
  },
  updateSite: function (sites, siteId, siteData) {
    siteData['uuid'] = siteId
    if (siteData['password'] != null && siteData['password'] !== '') {
      keytar.setPassword(keytarServiceName, siteId, siteData['password'])
      delete siteData['password']
    } else {
      keytar.deletePassword(keytarServiceName, siteId)
      siteData['password'] = false
    }
    sites[siteId] = siteData
    this.writeSitesConfig(sites)
    return siteId
  },
  deleteSite: function (sites, siteId) {
    var t = this
    if (!sites.hasOwnProperty(siteId)) {
      return null
    }
    delete sites[siteId]
    return keytar.deletePassword(keytarServiceName, siteId).then(function () {
      return new Promise(function (resolve, reject) {
        t.writeSitesConfig(sites)
        resolve()
      })
    })
  }
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 850,
    minWidth: 850,
    minHeight: 500
  })

  mainWindow.setMenu(null)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

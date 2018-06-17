'use strict'

import { app, remote, BrowserWindow } from 'electron'
const path = require('path')
const fs = require('fs')

global.settings = {
  getSitesConfig: function () {
    const userDataPath = (app || remote.app).getPath('userData')
    const dpath = path.join(userDataPath, 'site-data.json')
    var sites = []
    try {
      sites = JSON.parse(fs.readFileSync(dpath))
    } catch (error) {
      fs.writeFileSync(dpath, '[]')
    }
    return sites
  }
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
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

<template>
  <div id="wrapper">
    <header>
      <h1 class="title">My Sites - SCooP</h1>
    </header>
    <main>
      <div id="sites-list">
        <sites-list :sites="sites" :sel="sel" @selectSite="selectSite" @deleteSite="deleteSite"></sites-list>
      </div>
      <div id="connection-info">
        <site-info-form :selectedSite="selectedSite" :sel="sel" @saveSite="saveSite" @deleteSite="deleteSite"></site-info-form>
      </div>
    </main>
    <footer>
      <button class="pure-button pure-button-primary landing-btn"
        @click="sel = null"
        v-bind:class="{ 'selected': sel == null }">
        <i class="far fa-plus-square"></i>
        New Site
      </button>
      <button class="pure-button landing-btn" @click="loadSites()">
        <i class="fas fa-sync-alt"></i>
        Refresh Site List
      </button>
    </footer>
  </div>
</template>

<script>
  import SitesList from './LandingPage/SitesList.vue'
  import SiteInfoForm from './LandingPage/SiteInfoForm.vue'

  const remote = require('electron').remote

  export default {
    name: 'landing-page',
    data: function () {
      return {
        sel: null,
        sites: {}
      }
    },
    computed: {
      selectedSite: function () {
        var defaultSite = {
          siteName: 'New Site',
          host: '',
          protocol: 'ftpe',
          port: 21,
          username: '',
          password: ''
        }
        if (this.sel == null) {
          return defaultSite
        }
        var ss = this.sites[this.sel]
        // fill in the defaults wherever the data might be corrupted for some reason
        Object.keys(defaultSite).forEach(function (key, i) {
          if (typeof ss[key] === 'undefined') {
            ss[key] = defaultSite[key]
          }
        })
        return ss
      }
    },
    methods: {
      selectSite: function (ind) {
        this.sel = ind
      },
      loadSites: function () {
        this.sites = remote.getGlobal('settings').getSitesConfig()
      },
      saveSite: function (siteData) {
        if (this.sel == null) {
          var uuid = remote.getGlobal('settings').addSite(siteData)
          this.loadSites()
          this.sel = uuid
        } else {
          remote.getGlobal('settings').updateSite(this.sel, siteData)
          this.loadSites()
        }
      },
      deleteSite: function (sel) {
        var oldSel = this.sel
        this.sel = sel
        var sure = confirm('Really delete site "' + this.selectedSite.siteName + '"?')
        if (sure) {
          remote.getGlobal('settings').deleteSite(sel)
          this.loadSites()
          if (oldSel === sel) {
            // the selected site was deleted
            this.sel = null
          } else {
            // re-select the site that was selected
            this.sel = oldSel
          }
        } else {
          this.sel = oldSel
        }
      }
    },
    components: {
      SitesList,
      SiteInfoForm
    },
    mounted: function () {
      this.loadSites()
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  header, footer {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  footer { padding-left: 0px; }

  main {
    outline: 1px solid #888;
  }
  main::before,
  main::after {
    content: "";
    display: table;
    clear: both;
  }

  p {
    margin-bottom: 6px;
  }

  a {
    text-decoration: none;
    color: #43f;
  }

  a:hover {
    text-decoration: underline;
  }

  h1 {
    background-color: #fff;
    padding: 0px;
    margin: 0px !important;
  }

  .title {
    color: #246;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .border {
    border: 1px solid #888;
  }

  #connection-info {
    box-shadow: 0px 0px 4px #888 inset;
    border-left: 1px solid #888;
    background-color: #f0f0f0;
    padding: 6px;
    height: calc(100vh - 100px);
    width: 70%;
    float: left;
    overflow: auto;
  }

  .landing-btn {
    margin: 6px !important;
    margin-right: 0px !important;
  }

  #sites-list {
    background-color: #f0f0f0;
    padding: 6px;
    font-size: 16px;
    height: calc(100vh - 100px);
    width: 30%;
    float: left;
    overflow: auto;
  }

</style>

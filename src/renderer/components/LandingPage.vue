<template>
  <div id="wrapper">
    <header>
      <h1 class="title">My Sites - SCooP</h1>
    </header>
    <main>
      <sites-list :sites="sites" :sel="sel" @selectSite="selectSite"></sites-list>
      <div id="connection-info">
        <div v-if="sel == null" class="title">Add New Site</div>
        <div v-else class="title">{{ selectedSite.siteName }}</div>
        <site-info-form></site-info-form>
      </div>
    </main>
    <footer>
      <button class="pure-button pure-button-primary landing-btn"
        @click="sel = null"
        v-bind:class="{ 'selected': sel == null }">
        <i class="far fa-plus-square"></i>
        New Site
      </button>
    </footer>
  </div>
</template>

<script>
  import SitesList from './LandingPage/SitesList.vue'
  import SiteInfoForm from './LandingPage/SiteInfoForm.vue'

  export default {
    name: 'landing-page',
    data: function () {
      return {
        sel: null,
        sites: [
          { siteName: 'site 1' },
          { siteName: 'second site' },
          { siteName: 'andrewsiegman.com' },
          { siteName: 'nextwavesolutions.io' },
          { siteName: 'asdf' },
          { siteName: 'Lorem ipsum dolor' },
          { siteName: 'sit amet consectetur' },
          { siteName: 'adipisicing elit' },
          { siteName: 'Facere corrupti' },
          { siteName: 'eligendi nesciunt' },
          { siteName: 'sed quas adipisci' },
          { siteName: 'non iste alias' },
          { siteName: 'temporibus' },
          { siteName: 'ea veritatis' },
          { siteName: 'velit error eius' },
          { siteName: 'non iste alias' },
          { siteName: 'temporibus' },
          { siteName: 'ea veritatis' },
          { siteName: 'velit error eius' },
          { siteName: 'my fave site ever' }
        ]
      }
    },
    computed: {
      selectedSite: function () {
        if (this.sel == null) {
          return {}
        }
        return this.sites[this.sel]
      }
    },
    methods: {
      selectSite: function (ind) {
        this.sel = ind
      }
    },
    components: {
      SitesList,
      SiteInfoForm
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

</style>

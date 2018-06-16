<template>
  <div id="wrapper">
    <h1 class="title">My Sites - SCooP</h1>
    <main>
      <sites-list :sites="sites" :sel="sel" @selectSite="selectSite"></sites-list>
      <div id="connection-info">
        <div v-if="sel == null" class="title">Add New Site</div>
        <div v-else class="title">{{ selectedSite.siteName }}</div>
        <site-info-form></site-info-form>
      </div>
    </main>
    <ui-button
      class="pure-button-primary landing-btn"
      v-bind:class="{ 'selected': sel == null }"
      @click="sel = null"
      icon="far fa-plus-square">
      New Site
    </ui-button>
  </div>
</template>

<script>
  import SitesList from './LandingPage/SitesList.vue'
  import UiButton from './UI/Button.vue'
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
      UiButton,
      SiteInfoForm
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  main {
    border-top: 1px solid #888;
    border-bottom: 1px solid #888;
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
    padding: 20px;
    margin: 0px !important;
  }

  .title {
    color: #246;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  #connection-info {
    background-color: #ddd;
    padding: 6px;
    height: 400px;
    width: 70%;
    float: left;
    overflow: auto;
  }

  .landing-btn {
    margin: 6px !important;
    margin-right: 0px !important;
  }

</style>

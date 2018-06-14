<template>
  <div id="wrapper">
    <main>
      <div class="title">My Sites - SCooP</div>
      <div id="sites-list">
        <ul v-if="sites.length > 0">
          <li
            v-bind:class="{ 'selected': (i == sel) }"
            @click="selectSite(i)"
            v-for="(site, i) in sites">
            {{ site.siteName }}
          </li>
        </ul>
      </div>
      <div id="connection-info">
        <div v-if="sel == null" class="title">Add New Site</div>
        <div v-else class="title">{{ selectedSite.siteName }}</div>
      </div>
    </main>
  </div>
</template>

<script>
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
    width: 700px;
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

  #wrapper {
    height: 100vh;
    padding: 30px 40px;
    width: 100vw;
  }

  .title {
    color: #246;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  #sites-list {
    border-top: 1px solid #888;
    background-color: #eee;
    padding: 6px;
    font-size: 14px;
    height: 400px;
    width: 30%;
    overflow: auto;
    float: left;
  }

  #sites-list ul {
    list-style: none;
  }
  #sites-list ul li {
    cursor: pointer;
    padding: 3px;
  }
  #sites-list ul li:hover { background-color: #ccc; }
  #sites-list ul li.selected { background-color: #aae; }
  #sites-list ul li.selected:hover { background-color: #99e; }

  #connection-info {
    border-top: 1px solid #888;
    background-color: #ddd;
    padding: 6px;
    height: 400px;
    width: 70%;
    float: left;
  }

</style>

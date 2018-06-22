<template>
  <ul v-if="sites.length > 0">
    <li
      v-bind:class="{ 'selected': (i == sel) }"
      @click="selectSite(i)"
      @contextmenu="contextMenuHandler(i)"
      v-for="(site, i) in sites">
      {{ site.siteName }}
    </li>
  </ul>
</template>

<script>
  const remote = require('electron').remote

  const Menu = remote.Menu
  const MenuItem = remote.MenuItem

  export default {
    name: 'sites-list',
    data: function () {
      return {
        rightClicked: null,
        contextMenu: new Menu()
      }
    },
    methods: {
      selectSite: function (i) {
        this.$emit('selectSite', i)
      },
      contextMenuHandler: function (i) {
        this.rightClicked = i
        this.contextMenu.popup(remote.getCurrentWindow())
      }
    },
    mounted: function () {
      var v = this
      v.contextMenu.append(new MenuItem({
        label: 'Edit',
        click: function () {
          v.$emit('selectSite', v.rightClicked)
        }
      }))
      v.contextMenu.append(new MenuItem({
        type: 'separator'
      }))
      v.contextMenu.append(new MenuItem({
        label: 'Connect',
        click: function () {
          v.$emit('connectSite', v.rightClicked)
        }
      }))
      v.contextMenu.append(new MenuItem({
        label: 'Delete',
        click: function () {
          v.$emit('deleteSite', v.rightClicked)
        }
      }))
    },
    props: {
      sites: Array,
      sel: Number
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
  ul li {
    cursor: pointer;
    padding: 3px;
  }
  ul li:hover { background-color: #ccc; }
  ul li.selected {
    background-color: #0078e7;
    color: #fff;
  }
  ul li.selected:hover {
    filter: brightness(0.9);
  }
</style>

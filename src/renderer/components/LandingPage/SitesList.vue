<template>
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
</template>

<script>
  export default {
    name: 'sites-list',
    methods: {
      selectSite: function (i) {
        this.$emit('selectSite', i)
      }
    },
    props: {
      sites: Array,
      sel: Number
    }
  }
</script>

<style>
  #sites-list {
    background-color: #f0f0f0;
    padding: 6px;
    font-size: 16px;
    height: 400px;
    width: 30%;
    float: left;
    overflow: auto;
  }

  #sites-list ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
  #sites-list ul li {
    cursor: pointer;
    padding: 3px;
  }
  #sites-list ul li:hover { background-color: #ccc; }
  #sites-list ul li.selected { background-color: #aae; }
  #sites-list ul li.selected:hover { background-color: #99e; }
</style>

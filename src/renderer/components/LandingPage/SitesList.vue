<template>
  <ul v-if="sites.length > 0">
    <li
      v-bind:class="{ 'selected': (i == sel) }"
      @click="selectSite(i)"
      v-for="(site, i) in sites">
      {{ site.siteName }}
    </li>
  </ul>
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

<template>
  <button class="btn" @click="clicked()">
    <i v-if="icon" v-bind:class="icon"></i>
    <slot>Button</slot>
  </button>
</template>

<script>
  export default {
    name: 'ui-button',
    methods: {
      clicked: function (e) {
        this.$emit('click', e)
      }
    },
    props: ['icon']
  }
</script>

<style>
  .btn {
    padding: 6px;
    background-color: #eee;
    border: 1px solid #888;
    margin: 6px;
    cursor: pointer;
    font-family: 'Source Sans Pro', sans-serif;
    outline: none;
    font-size: 14px;
  }
  .btn:hover { background-color: #ccc; }
  .btn.selected { background-color: #aae; }
</style>

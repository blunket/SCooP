<template>
  <button class="pure-button" @click="clicked()">
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

<template>
  <div class="app">
    <v-header />
    <router-view></router-view>
    <v-bottom />
  </div>
</template>

<script>
  import vHeader from './components/v-header.vue';
  import vBottom from './components/v-bottom.vue';

  export default {
    name: "app",
    components: {
      vHeader,
      vBottom
    },
    data() {
      return {
        adverts: [],

      };
    },
  };
</script>

<style>

</style>
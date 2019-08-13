<template>
  <div id="app">
    <Emote msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Emote from './components/Emote.vue'

export default {
  name: 'app',
  components: {
    Emote
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  body {
      background-color: #ddd;
  }
</style>

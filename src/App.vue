<template>
  <div id="app">
    <v-app>
      <v-toolbar app color="red" class="white--text darken-1">
      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>
    </v-toolbar>
      <v-content>
        <Test msg="Welcome to Your Vue.js App"/>
      </v-content>
  </v-app>
  </div>
</template>

<script>
import Test from './components/Test.vue'

export default {
  name: 'app',
  components: {
    Test
  },
  data () {
    return {
      title: 'Learnet Academy - C202 - Final Exam'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

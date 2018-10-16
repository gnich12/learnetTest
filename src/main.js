import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDD9SbivxXw1mTr5h26vP0U7S-pSEmyYsY',
      authDomain: 'midtermapp-9b881.firebaseapp.com',
      databaseURL: 'https://midtermapp-9b881.firebaseio.com',
      projectId: 'midtermapp-9b881',
      storageBucket: 'midtermapp-9b881.appspot.com',
      messagingSenderId: '528608092517'
    })
  }
}).$mount('#app')

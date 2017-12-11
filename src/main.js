// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { store } from '@/store.js'

// index.js or main.js
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader

Vue.use(VueFire)
Vue.use(Vuetify)

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCOvFBb92U9s0uTpRESQfzn2H0f8wSvuNg',
  authDomain: 'ls-media-store.firebaseapp.com',
  databaseURL: 'https://ls-media-store.firebaseio.com',
  projectId: 'ls-media-store',
  storageBucket: 'ls-media-store.appspot.com',
  messagingSenderId: '524937624947'
}
firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('App login')
        this.$store.dispatch('autoSign', user)
      } else {
        console.log('App logout')
      }
    })
  }
})

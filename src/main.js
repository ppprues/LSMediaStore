// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import * as firebase from 'firebase'

// index.js or main.js
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader

Vue.use(Vuetify)

Vue.config.productionTip = false

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: 'AIzaSyCOvFBb92U9s0uTpRESQfzn2H0f8wSvuNg',
  authDomain: 'ls-media-store.firebaseapp.com',
  databaseURL: 'https://ls-media-store.firebaseio.com',
  projectId: 'ls-media-store',
  storageBucket: 'ls-media-store.appspot.com',
  messagingSenderId: '524937624947'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

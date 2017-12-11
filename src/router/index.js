import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Movies from '@/components/Movies.vue'
import Music from '@/components/Music.vue'
import Register from '@/components/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Music',
      name: 'Music',
      component: Music
    },
    {
      path: '/Movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})

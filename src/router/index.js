import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Movies from '@/components/Movies.vue'
import Music from '@/components/Music.vue'
import CustomerRegister from '@/components/CustomerRegister.vue'
import AddAlbum from '@/components/AddAlbum.vue'
import AddMovie from '@/components/AddMovie.vue'
import AddMusic from '@/components/AddMusic.vue'
import AdminRegister from '@/components/AdminRegister.vue'
import CompanyRegister from '@/components/CompanyRegister.vue'
import AdminMusic from '@/components/AdminMusic.vue'
import AdminMovie from '@/components/AdminMovie.vue'
import AdminAlbum from '@/components/AdminAlbum.vue'
import CompanyMusic from '@/components/CompanyMusic.vue'

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
      name: 'CustomerRegister',
      component: CustomerRegister
    },
    {
      path: '/Company',
      name: 'WelcomeCompany',
      component: Welcome
    },
    {
      path: '/Company/Register',
      name: 'CompanyRegister',
      component: CompanyRegister
    },
    {
      path: '/Company/AddAlbum',
      name: 'AddAlbum',
      component: AddAlbum
    },
    {
      path: '/Company/AddMusic',
      name: 'AddMusic',
      component: AddMusic
    },
    {
      path: '/Company/Music',
      name: 'CompanyMusic',
      component: CompanyMusic
    },
    {
      path: '/Company/AddMovie',
      name: 'AddMovie',
      component: AddMovie
    },
    {
      path: '/Artist',
      name: 'WelcomeArtist',
      component: Welcome
    },
    {
      path: '/Admin/Register',
      name: 'AdminRegister',
      component: AdminRegister
    },
    {
      path: '/Admin/Music',
      name: 'AdminMusic',
      component: AdminMusic
    },
    {
      path: '/Admin/Movies',
      name: 'AdminMovie',
      component: AdminMovie
    },
    {
      path: '/Admin/Album',
      name: 'AdminAlbum',
      component: AdminAlbum
    }
  ]
})

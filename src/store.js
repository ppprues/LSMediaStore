import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'
import { db, auth, storage } from './main'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUp ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        var email = payload.email;
        var password = payload.password;
        auth.createUserWithEmailAndPassword(email,password).then(
          user => {
            const uid = user.uid
            commit('setUser', uid)
            resolve()
          }
        ).catch(
          err => {
            reject(err)
          }
          )
      })
    },
    signIn ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
          .then (user => {
            const uid = user.uid
            commit('setUser', uid)
            resolve()
          }
          ).catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('passw: ' + payload.password)
            reject(error)
          })
      })
    },
    signOut ({ commit }) {
      return new Promise((resolve, reject) => {
        auth.signOut().then(() => {
          commit('setUser', null)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    autoSign ({ commit }, payload) {
      commit ('setUser', payload)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})

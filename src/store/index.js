//import Vue from 'vue'
import Vuex from 'vuex'

export default new Vuex.Store({
  // Basically the `data` in your component but for the whole app.
  state: {
    idMesa: 0,
    misMesas: 0,
    open: false
  },
  // Basically `computed` values shared across components.
  getters: {
    idUsuario: function () {
      return localStorage.getItem('idUsuario')
    },
  },
  // Synchronous methods for modifying the values in the state.
  // They are handed a `state` from the store, and an optional `payload` value you pass in.
  mutations: {
    setUsuario: function (state, payload) {
      state.idUsuario = payload
      state.misMesas = 99
      localStorage.setItem('idUsuario', payload)
    },
    setMesa: function (state, payload) {
      state.idMesa = payload
    },
    setOpen: function (state, payload) {
      state.open = payload
    },
  },

  // Asynchronous methods that can call mutation methods to mutate the state via commits.
  // They are handed a context of the `store`, and an optional `payload` object you pass in.
  actions: {
    setUsuario: function (store, payload) {
      store.commit('setUsuario', payload)
    },
    setMesa: function (store, payload) {
      store.commit('setMesa', payload)
    },
    setOpen: function (store, payload) {
      store.commit('setOpen', payload)
    }

  },
})

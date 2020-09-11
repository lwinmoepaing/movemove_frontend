// Import Config file
import localforage from 'localforage'
import Cookie from 'js-cookie'
import { LOGIN_REQUEST, REGISTER_REQUEST } from '~/assets/api/auth/authApi'

export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_USER(state, user) {
    state.user = user
  },

  RESET_AUTH(state) {
    state.token = null
    state.user = null
  },

  SET_USER_NAME(state, name) {
    state.user.name = name
  },

  SET_USER_PHONE(state, phone) {
    state.user.phone = phone
  }
}

export const actions = {
  async submitLogin(vueContext, payloads) {
    // const Console = console
    // Console.log('vueContext', vueContext)
    try {
      const axios = this.$axios
      const response = await LOGIN_REQUEST(axios, payloads)
      // Set State to Vuex
      vueContext.commit('SET_TOKEN', response.token)
      vueContext.commit('SET_USER', response.data)

      // Client Set State
      await localforage.setItem('stored:token', response.token)
      await localforage.setItem('stored:user', JSON.stringify(response.data))

      // Server Set State
      Cookie.set('token', response.token)
      Cookie.set('user', response.data)

      // Console Output: contextCheck
      // Console.log('vueContext', vueContext)
      this.$router.push('/')
      return response
    } catch (e) {
      const error = e
      error.message = e.message
      throw e
    }
  },

  async submitRegister(vueContext, payloads) {
    // const Console = console
    // Console.log('vueContext', vueContext)
    try {
      const axios = this.$axios
      const response = await REGISTER_REQUEST(axios, payloads)
      // Set State to Vuex
      vueContext.commit('SET_TOKEN', response.token)
      vueContext.commit('SET_USER', response.data)

      // Client Set State
      await localforage.setItem('stored:token', response.token)
      await localforage.setItem('stored:user', JSON.stringify(response.data))

      // Server Set State
      Cookie.set('token', response.token)
      Cookie.set('user', response.data)

      // Console Output: contextCheck
      // Console.log('vueContext', vueContext)
      this.$router.push('/')
      return response
    } catch (e) {
      const error = e
      error.message = e.message
      throw e
    }
  },

  async resetAuth({ commit }) {
    Cookie.remove('token')
    Cookie.remove('user')
    await localforage.clear()
    const Console = console
    Console.log('Calling Reset Auth')
    // Console.log('this', this)
    commit('RESET_AUTH')

    if (window) {
      window.location = '/'
    } else {
      this.$router.push('/')
    }
  },

  setToken: ({ commit }, token) => {
    commit('SET_TOKEN', token)
  },

  setUser: ({ commit }, user) => {
    commit('SET_USER', user)
  },

  // Initial Auth is Check auth
  async initAuth({ commit, state }, server) {
    let token, user
    if (server && server.headers.cookie) {
      const jwtCookie = server.headers.cookie
        .split(';')
        .find((query) => query.trim().startsWith('token='))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1]
      user = server.headers.cookie
        .split(';')
        .find((query) => query.trim().startsWith('user='))
        .split('=')[1]
    } else {
      token = await localforage.getItem('stored:token')
      user = await localforage.getItem('stored:user')
    }
    commit('SET_TOKEN', token)
    commit('SET_USER', JSON.parse(unescape(user)))
  }
}

export const getters = {
  token: ({ token }) => token,

  user: ({ user }) => user,

  isAuthenticated: ({ token }) => !!token
}

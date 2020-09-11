// This store is only to show snackbar
// Eg, Error alert or success alert
export const state = () => ({
  showSnack: false,
  snack: [''],
  type: 'accent',
  color: ''
})

export const mutations = {
  SET_SNACK(state, snack) {
    state.snack = snack
  },

  SHOW_SNACK(state) {
    state.showSnack = true
  },

  CLOSE_SNACK(state) {
    state.showSnack = false
  },

  SET_COLOR(state, color) {
    state.color = color
  }
}

export const actions = {
  showSnack({ commit }) {
    commit('SHOW_SNACK')
  },
  closeSnack({ commit }) {
    commit('CLOSE_SNACK')
  },
  setSnackMessage({ commit }, messages = []) {
    commit('SET_SNACK', messages)
  },
  setSnackColor({ commit }, color = '') {
    commit('SET_COLOR', color)
  }
}

export const getters = {
  message: ({ snack }) => snack,

  type: ({ type }) => type,

  showSnack: ({ showSnack }) => showSnack,

  snackColor: ({ color }) => color
}

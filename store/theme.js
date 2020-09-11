// State
export const state = () => ({
  type: 'light'
})

// Mutations
export const mutations = {
  SET_THEME: (state, payload) => {
    state.type = payload
  }
}

// Actions
export const actions = {
  changeTheme: ({ commit }, type = 'dark') => {
    commit('SET_THEME', type)
  }
}

// Getters
export const getters = {
  type(state) {
    return state.type
  }
}

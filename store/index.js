export const state = () => ({
  locales: ['en', 'mm'],
  locale: 'mm',
  isShowRightAside: false
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },

  SET_RIGHT_ASIDE(state, showRightStatment) {
    state.isShowRightAside = showRightStatment
  }
}

export const actions = {
  setRightAside({ commit }, payload = true) {
    commit('SET_RIGHT_ASIDE', payload)
  }
}

export const getters = {
  locale({ locale }) {
    return locale
  },
  isShowRightAside({ isShowRightAside }) {
    return isShowRightAside
  }
}

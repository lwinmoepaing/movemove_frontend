// State
export const state = () => ({
  showStoryCreateComponent: false,

  // State to add New Story Data
  // return { Object } This'll be object
  newStoryData: null
})

// Mutations
export const mutations = {
  SET_SHOW_STORY_CREATE: (state, payload) => {
    state.showStoryCreateComponent = payload
  },

  // State to add New Story Data
  SET_NEW_STORY: (state, payload) => {
    state.newStoryData = payload
  }
}

// Actions
export const actions = {
  setShowStoryCreateComponent: ({ commit }, type = true) => {
    commit('SET_SHOW_STORY_CREATE', type)
  },

  // Set New Story
  setNewStory: ({ commit }, payload) => {
    commit('SET_NEW_STORY', payload)
  }
}

// Getters
export const getters = {
  showStoryCreateComponent(state) {
    return state.showStoryCreateComponent
  },

  // Get to add New Story
  addedNewStory(state) {
    return state.newStoryData
  }
}

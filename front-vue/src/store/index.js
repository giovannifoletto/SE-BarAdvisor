import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      user: null
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token
      state.user = payload.user
    },
    resetToken(state) {
        state.token = null
    }
  }
})

export default store

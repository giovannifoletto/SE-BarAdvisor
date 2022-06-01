import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      email: ''
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token
      state.email = payload.email
    },
    resetToken(state) {
        state.token = null
    }
  }
})

export default store

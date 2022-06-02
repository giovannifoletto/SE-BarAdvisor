import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      user: {}
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token
      state.user = payload.user
      localStorage.setItem('token', payload.token)
    },
    resetToken(state) {
        state.token = null
        localStorage.removeItem('token')
    },
  }
})

export default store

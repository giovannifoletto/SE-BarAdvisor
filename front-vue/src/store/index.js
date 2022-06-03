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
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    resetToken(state) {
        state.token = null
        localStorage.removeItem('token')
    },
    // recoverState(state){
    //   if(localStorage.getItem('token') != null){
    //     state.token = localStorage.getItem('token')
    //     state.user = JSON.parse(localStorage.getItem('user'))
    //   }
    // }
  }
})

export default store

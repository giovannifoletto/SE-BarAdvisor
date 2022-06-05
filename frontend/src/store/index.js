import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      user: {}
    }
  },
  mutations: {
    setLogin(state, payload) {
      state.token = payload.token
      state.user = payload.user

      if (payload.restaLoggato) {
        sessionStorage.setItem('token', payload.token)
        sessionStorage.setItem('user', JSON.stringify(payload.user))
      } else {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
    },
    resetToken(state) {
      state.token = null
      state.user = null
      try{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } catch(error){
        console.log("No data in the localStorage")
      }
      try{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
      } catch(error){
        console.log("No data in the sessionStorage")
      }
    },
    recoverState(state) {
      if (localStorage.getItem('token') != null) {
        state.token = localStorage.getItem('token')
        state.user = JSON.parse(localStorage.getItem('user'))
      }
      if (sessionStorage.getItem('token') != null) {
        state.token = sessionStorage.getItem('token')
        state.user = JSON.parse(sessionStorage.getItem('user'))
      }
    }
  }
})

export default store

import store from '../store'

export default function auth(to, from, next) {
    if(!store.state.token){
        next({name: 'login'})
    } else {
        next()
    }
}
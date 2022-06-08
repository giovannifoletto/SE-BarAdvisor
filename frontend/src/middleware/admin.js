import store from '../store'

export default function role(to, from, next) {
    if(store.state.user.ruolo !== 'Admin'){
        next({name: 'error403'})
    } else next()
}
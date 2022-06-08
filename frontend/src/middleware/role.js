import store from '../store'

export default function role(to, from, next) {
    if(store.state.user.ruolo !== 'GestoreLocale' || store.state.user.locale !== from.params.localeID){
        next({name: 'error403'})
    } else next()
}
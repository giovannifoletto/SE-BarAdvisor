import store from '../store'

export default function auth(to, from) {
    console.log("Redirect")
    if(!store.state.token && to.name !== 'login'){
        return {name: 'login'}
    }
    return true
}
export default function({store, redirect}){
    if(!process.client) return

    if(store.getters['user'].ruolo == "Cliente") return redirect('/login')
}
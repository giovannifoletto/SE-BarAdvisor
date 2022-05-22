export default function({store, redirect}){
    if(!process.client) return

    if(store.getters['user'].ruolo != "Admin") return redirect('/login?error=wrongRole')
}
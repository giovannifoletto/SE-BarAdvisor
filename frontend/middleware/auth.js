export default function({store, redirect}){
    if(!process.client) return

    if(!store.getters['user']) return redirect('/login?error=auth')
}
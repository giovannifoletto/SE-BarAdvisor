export default function({store, redirect}){
    
    if(!process.client) return

    if(!process.env.testEnv) return

    if(!store.getters['user']) return redirect('/login?error=auth')
}
export default function({store, redirect}){
    if(!process.client) return

    if(localStorage.getItem('user') != null){
        const user = JSON.parse(atob(localStorage.getItem('user')));

        if(user.ruolo != 'Admin') return redirect('/login?error=wrongRole')

    } else if (sessionStorage.getItem('user') != null){
        const user = JSON.parse(atob(sessionStorage.getItem('user')));

        if(user.ruolo != 'Admin') return redirect('/login?error=wrongRole')
        
    } else return redirect('/login')
}
export default function ({ store, redirect }) {

    if (!process.client) return

    if (!process.env.testEnv) return

    if (localStorage.getItem('authToken') == null && sessionStorage.getItem('authToken') == null) return redirect('/login?error=auth')
}
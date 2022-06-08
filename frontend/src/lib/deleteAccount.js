import store from '@/store'
import config from '@/config'

export default async function () {
    const opzioneRichiesta = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${store.state.token}` }
    }

    let error = {
        status: false,
        messaggio: ""
    }

    let data = null;

    try {
        const res = await fetch(`${config.baseURL}/auth/utenti/${store.state.user.id}`, opzioneRichiesta)
        data = await res.json()

        if (!data.success){
            error = { status: true, messaggio: data.error || data.messaggio }
        }

    }
    catch (error) {
        error = { status: true, messaggio: error }
    }
    finally {
        return { data, error }
    }
}
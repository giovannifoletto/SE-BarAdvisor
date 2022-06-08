import store from '@/store'
import config from '@/config'

export default async function followLocale(localeID) {
    const opzioneRichiesta = {
        method: 'POST',
        headers: { Authorization: `Bearer ${store.state.token}` }
    }

    let error = {
        status: false,
        messaggio: ""
    }

    let data = null;

    try {
        const res = await fetch(`${config.baseURL}/locali/${localeID}/segui`, opzioneRichiesta)
        data = await res.json()

        if (!data.success) {
            error = { status: true, messaggio: data?.error || data?.message }
        }

    } catch (error) {
        error = { status: true, messaggio: error }
    }
    finally {
        return { data, error }
    }
}
import store from '@/store'
import config from '@/config';

export default async function postProtazione(eventoID) {
    const opzioniRichiesta = {
        method: "POST",
        headers: { "Authorization": `Bearer ${store.state.token}` },
    };

    let error = {
        status: false,
        messaggio: ""
    }

    let data = null;

    try {
        const res = await fetch(
            `${config.baseURL}/eventi/${eventoID}/prenotazioni`,
            opzioniRichiesta
        );

        data = await res.json();

        if (!data.success) {
            error.status = true;
            error.messaggio =
                data?.error || data?.message || "Errore inaspettato, riprovare";
        }

    } catch (err) {
        error.status = true;
        error.messaggio = err || "Errore inaspettato, riprovare";
    } finally {
        return { data, error }
    }
}
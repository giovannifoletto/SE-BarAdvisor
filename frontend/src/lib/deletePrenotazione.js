import store from '@/store'
import config from '@/config'

export default async function deletePrenotazione(eventoID) {
    const opzioniRichiesta = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${store.state.token}` },
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
        this.error.status = true;
        this.error.messaggio = err || "Errore inaspettato, riprovare";
    }
    finally {
        return { data: data, error: error }
    }
}
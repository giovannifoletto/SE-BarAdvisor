export const state = () => ({
    user: {
        id: null,
        email: null,
        ruolo: null,
        token: null
    },
})

export const mutations = {

    /**
     * Add new user
     * @param {*} state
     * @param {user} UserObject
     */
    add(state, { user }) {
        state.user = user
    },
    /**
     * Delete user
     * @param {*} state
     */
    remove(state) {
        state.user = null
    },

    /**
     * Testing 
     */
    savePersistence(state){
        if(process.client){
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    },
    recoverPersistence(state){
        if(process.client){
            const getUser = localStorage.getItem('user')
            state.user = JSON.parse(getUser)
        }
    }
}

export const getters = () => ({
    getToken: (state) => {
        return state.user.token
    },

    getRuolo: (state) => {
        return state.user.ruolo
    }
})

export const setters = () => ({
    setToken: (state, token) => {
        state.user.token = token
    },
    setUser: (state, {user}) => {
        state.user = user
    }
})
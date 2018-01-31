// State
const state = {
    auth: false,
    user: {}
}

// Getters
const getters = {
    is_auth() {
        return state.auth;
    }
}

// Actions
const actions = {}

// Mutations
const mutations = {
    set_user(state, user) {
        state.user = user;
        state.auth = true;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
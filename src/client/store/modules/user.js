import Vue from 'vue'

// State
const state = {
    auth: false,
    ready: false,
    user: {}
}

// Getters
const getters = {
    is_auth() {
        return state.auth;
    },
    auth_component_ready() {
        return state.ready;
    }
}

// Actions
const actions = {
    auth({commit, state}) {
        const token = Vue.cookie.get('token')
        if(token) {
            Vue.http.post('/api/auth', JSON.stringify({token})).then(({ body }) => {
                this.$store.commit('set_user', body);
                state.ready = true;
            }).catch(err => {
                Vue.cookie.delete('token');
                state.ready = true;
            });
        }
        else
            state.ready = true;
    }
}

// Mutations
const mutations = {
    set_user(state, user) {
        state.user = user;
        state.auth = true;
        Vue.cookie.set('token', user.token, 1);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
import Vue from 'vue'
import db from './db'

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
    },
    user() {
        return state.user;
    },
    task() {
        return db[state.user.tasks[0]];
    },
    stats() {
        return state.user.stats;
    }
}

// Actions
const actions = {
    auth({commit, state}) {
        const token = Vue.cookie.get('token')
        if(token) {
            Vue.http.post('/api/auth', JSON.stringify({token})).then(({ body }) => {
                commit('set_user', body);
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
    },
    logout(state) {
        state.user = {};
        state.auth = false;
        Vue.cookie.delete('token');
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
import Vue from 'vue'
import db from './db'

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

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
    question() {
        return db[state.user.questions[0]];
    },
    stats() {
        const stats = state.user.stats;
        stats.to_learn = state.user.questions.length;
        return stats;
    },
    settings() {
        return state.user.settings;
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
    },
    update({state}) {
        Vue.http.put('/api/user', state.user)
    }, 
    correct({state, dispatch}) {
        state.user.stats.correct += 1;
        state.user.questions.shift();
        state.user.questions = shuffle(state.user.questions);
        dispatch('update')
    },
    incorrect({ state, dispatch}) {
        state.user.stats.wrong += 1;
        const id = state.user.questions.shift();
        const repeat = state.user.settings.multiplyAfterMistake;
        for(let i = 0; i < repeat; i++)
        state.user.questions.push(id);
        state.user.questions = shuffle(state.user.questions);
        dispatch('update')
    },
    set_settings({ state, dispatch}, settings) {
        state.user.settings = settings;
        dispatch('update')
    },
    reset({state, dispatch}) {
        state.user.questions = shuffle(Object.keys(db));
        state.user.stats = {
            correct: 0,
            wrong: 0
        }
        dispatch('update')
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
import { createStore } from 'vuex';

export const store = new createStore({
    state: {
        loggedIn: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',
    },
    mutations: {
        login(state, username) {
            state.loggedIn = true;
            state.username = username;
        },
        logout(state) {
            state.loggedIn = false;
            state.username = '';
        },
    },
    actions: {
        login: ({ commit }, username) => {
            localStorage.setItem('username', username);
            commit('login', username);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('username');
            commit('logout');
        },
    },
    getters: {
        username: state => state.username,
        loggedIn: state => state.loggedIn,
    },
});

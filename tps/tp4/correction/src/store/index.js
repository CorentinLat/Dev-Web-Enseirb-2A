import { createStore } from 'vuex';

export const store = new createStore({
    state: {
        loggedin: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',
    },
    mutations: {
        login(state, username) {
            state.loggedin = true;
            state.username = username;
        },
        logout(state) {
            state.loggedin = false;
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
        loggedIn: state => state.loggedin,
    },
});

import { createStore } from 'vuex';

import { deleteBets } from '../api/paris';

export const store = new createStore({
    state: {
        loggedIn: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',
        race: {
            state: 'En attente Paris',
            winner: null,
        }
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
        updateRace(state, payload) {
            state.race.state = payload.state;
            state.race.winner = payload.winner;
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

        startRace: ({ commit }) => commit('updateRace', { state: 'En cours' }),
        raceFinished: ({ commit }, winner) => commit('updateRace', { state: 'Terminée', winner }),
        waitingForBets: async ({ commit, state }) => {
            if (state.race.state === 'Terminée') {
                await deleteBets();
            }

            commit('updateRace', { state: 'En attente Paris' });
        },
    },
    getters: {
        username: state => state.username,
        loggedIn: state => state.loggedIn,

        raceState: state => state.race.state,
        raceWinner: state => state.race.winner,
    },
});

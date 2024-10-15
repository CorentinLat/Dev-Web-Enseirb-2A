import axios from 'axios';

const API_URL = 'http://localhost:3000';
const BETS_URL = `${API_URL}/paris`;

export const getAllBets = async () => {
    try {
        const response = await axios.get(BETS_URL);

        return response.data;
    } catch (e) {
        console.error(e);
    }
};

export const addBet = async (author, horse) => {
    try {
        await axios.post(BETS_URL, { auteur: author, cheval: horse });
    } catch (e) {
        console.error(e);
    }
};

export const generateBets = async () => {
    try {
        await axios.post(`${BETS_URL}/generate`);
    } catch (e) {
        console.error(e);
    }
};

export const deleteBet = async id => {
    try {
        await axios.delete(`${BETS_URL}/${id}`);
    } catch (e) {
        console.error(e);
    }
};

export const deleteBets = async () => {
    try {
        await axios.delete(BETS_URL);
    } catch (e) {
        console.error(e);
    }
};

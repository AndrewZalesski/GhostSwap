
const axios = require('axios');
const { KASPLEX_API_URL } = require('../config');

// Fetch KRC20 token details
exports.getTokenDetails = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}`);
        return response.data;
    } catch (error) {
        console.error(`[KasplexUtil] Error fetching token details for ${ticker}:`, error.message);
        throw new Error(`Failed to fetch token details for ${ticker}.`);
    }
};

// Fetch KRC20 token holders
exports.getTokenHolders = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}/holders`);
        return response.data;
    } catch (error) {
        console.error(`[KasplexUtil] Error fetching token holders for ${ticker}:`, error.message);
        throw new Error(`Failed to fetch token holders for ${ticker}.`);
    }
};

// Fetch KRC20 token statistics
exports.getTokenStats = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}/stats`);
        return response.data;
    } catch (error) {
        console.error(`[KasplexUtil] Error fetching token stats for ${ticker}:`, error.message);
        throw new Error(`Failed to fetch token stats for ${ticker}.`);
    }
};

// Placeholder for fetching token market history
exports.getTokenMarketHistory = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}/market-history`);
        return response.data;
    } catch (error) {
        console.error(`[KasplexUtil] Error fetching market history for ${ticker}:`, error.message);
        throw new Error(`Failed to fetch market history for ${ticker}.`);
    }
};

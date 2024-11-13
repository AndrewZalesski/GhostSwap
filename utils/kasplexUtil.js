const axios = require('axios');
const { KASPLEX_API_URL } = require('../config');

// Fetch KRC20 token details
exports.getTokenDetails = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching token details:", error.message);
        throw new Error("Failed to fetch token details.");
    }
};

// Fetch KRC20 token holders
exports.getTokenHolders = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}/holders`);
        return response.data;
    } catch (error) {
        console.error("Error fetching token holders:", error.message);
        throw new Error("Failed to fetch token holders.");
    }
};

// Fetch KRC20 token statistics
exports.getTokenStats = async (ticker) => {
    try {
        const response = await axios.get(`${KASPLEX_API_URL}/krc20/token/${ticker}/stats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching token statistics:", error.message);
        throw new Error("Failed to fetch token statistics.");
    }
};

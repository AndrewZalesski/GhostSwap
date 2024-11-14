
const axios = require("axios");
const { KASPA_API_URL } = require("../config");

const kaspaClient = {
    async getBalance(address) {
        try {
            const response = await axios.get(`${KASPA_API_URL}/addresses/${address}/balance`);
            return response.data;
        } catch (error) {
            console.error(`[KaspaClient] Error fetching balance for address ${address}:`, error.message);
            throw new Error(`Failed to fetch balance for address ${address}.`);
        }
    },
    async getFeeEstimate() {
        try {
            const response = await axios.get(`${KASPA_API_URL}/info/fee-estimate`);
            return response.data;
        } catch (error) {
            console.error(`[KaspaClient] Error fetching fee estimate:`, error.message);
            throw new Error(`Failed to fetch fee estimate.`);
        }
    },
    async getPrice() {
        try {
            const response = await axios.get(`${KASPA_API_URL}/info/price`);
            return response.data.price;
        } catch (error) {
            console.error(`[KaspaClient] Error fetching price:`, error.message);
            throw new Error(`Failed to fetch Kaspa price.`);
        }
    },
    // Placeholder for fetching network stats
    async getNetworkStats() {
        try {
            const response = await axios.get(`${KASPA_API_URL}/network/stats`);
            return response.data;
        } catch (error) {
            console.error(`[KaspaClient] Error fetching network stats:`, error.message);
            throw new Error(`Failed to fetch network stats.`);
        }
    }
};

module.exports = kaspaClient;

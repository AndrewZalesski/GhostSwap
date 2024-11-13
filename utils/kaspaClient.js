const axios = require("axios");
const { KASPA_API_URL } = require("../config");

const kaspaClient = {
    async getBalance(address) {
        const response = await axios.get(`${KASPA_API_URL}/addresses/${address}/balance`);
        return response.data;
    },
    async getFeeEstimate() {
        const response = await axios.get(`${KASPA_API_URL}/info/fee-estimate`);
        return response.data;
    },
    async getPrice() {
        const response = await axios.get(`${KASPA_API_URL}/info/price`);
        return response.data.price;
    },
};

module.exports = kaspaClient;

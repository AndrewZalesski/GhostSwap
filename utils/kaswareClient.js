const kaswareClient = {
    async requestAccounts() {
        if (typeof window.kasware !== "undefined") {
            return await window.kasware.requestAccounts();
        }
        throw new Error("Kasware Wallet is not installed");
    },
    async getKRC20Balance(address) {
        if (typeof window.kasware !== "undefined") {
            return await window.kasware.getKRC20Balance();
        }
        throw new Error("Kasware Wallet is not installed");
    },
    // Placeholder for the marketplace-specific API calls
    async placeholderListAPI() {
        return Promise.resolve({ success: false, message: "API not yet available" });
    },
};

module.exports = kaswareClient;

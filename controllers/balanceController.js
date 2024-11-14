
const kaswareClient = require('../utils/kaswareClient');

exports.getBalances = async (req, res) => {
    try {
        const accounts = await kaswareClient.getAccounts();
        if (accounts.length === 0) {
            return res.status(404).json({ success: false, message: "No accounts connected" });
        }

        const address = accounts[0];
        const kaspaBalance = await kaswareClient.getBalance();
        const krc20Balances = await kaswareClient.getKRC20Balance();

        res.json({
            success: true,
            address,
            balances: { kaspaBalance, krc20Balances },
        });
    } catch (error) {
        console.error("Error fetching balances:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve balances" });
    }
};

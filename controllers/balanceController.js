const kaswareClient = require("../utils/kaswareClient");

exports.getBalances = async (req, res) => {
    try {
        const accounts = await kaswareClient.getAccounts();
        if (accounts.length === 0) {
            return res.status(404).json({ success: false, message: "No accounts connected" });
        }

        const address = accounts[0];
        const kaspaBalance = await kaswareClient.getBalance();
        const krc20Balances = await kaswareClient.getKRC20Balance();

        const formattedKRC20Balances = krc20Balances.map(token => ({
            ticker: token.tick,
            balance: (token.balance / Math.pow(10, token.dec)).toFixed(8),
            locked: token.locked,
        }));

        res.json({
            success: true,
            kaspaBalance: {
                confirmed: (kaspaBalance.confirmed / 1e8).toFixed(8),
                unconfirmed: (kaspaBalance.unconfirmed / 1e8).toFixed(8),
                total: (kaspaBalance.total / 1e8).toFixed(8),
            },
            krc20Balances: formattedKRC20Balances,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

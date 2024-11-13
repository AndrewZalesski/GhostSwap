const kaswareClient = require("../utils/kaswareClient");

exports.connectWallet = async (req, res) => {
    try {
        const accounts = await kaswareClient.requestAccounts();
        res.json({ success: true, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const crypto = require("crypto");

module.exports = {
    hashSensitiveData(data) {
        return crypto.createHash("sha256").update(data).digest("hex");
    },
};

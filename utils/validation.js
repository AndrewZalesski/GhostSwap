const { body, query } = require("express-validator");

module.exports = {
    validateTicker: body("ticker")
        .isString()
        .isLength({ min: 1, max: 6 })
        .withMessage("Ticker must be a string of 1-6 characters."),
    validateAddress: body("address")
        .matches(/^kaspa:[a-z0-9]+$/)
        .withMessage("Invalid Kaspa address."),
    validatePagination: query("page")
        .isInt({ min: 1 })
        .withMessage("Page number must be a positive integer."),
};

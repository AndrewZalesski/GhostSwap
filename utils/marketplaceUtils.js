// utils/marketplaceUtil.js

const { FEE_PERCENTAGE, TREASURY_ADDRESS } = require("../config");

/**
 * Calculate platform fees for a given amount.
 * @param {number} amount - The transaction amount in KAS.
 * @returns {number} Fee in KAS.
 */
exports.calculatePlatformFee = (amount) => {
  return (amount * FEE_PERCENTAGE) / 100;
};

/**
 * Validate a marketplace order.
 * @param {object} order - The order object.
 * @returns {boolean} Validation status.
 */
exports.validateOrder = (order) => {
  if (!order.ticker || typeof order.ticker !== "string" || order.ticker.length > 6) {
    throw new Error("Invalid ticker");
  }
  if (!order.amount || order.amount <= 0) {
    throw new Error("Invalid amount");
  }
  if (!order.price || order.price <= 0) {
    throw new Error("Invalid price");
  }
  return true;
};

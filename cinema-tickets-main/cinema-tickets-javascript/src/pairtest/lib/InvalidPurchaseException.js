// src/pairtest/lib/InvalidPurchaseException.js

/**
 * Custom error class to represent invalid purchase exceptions.
 * This class extends the built-in Error class to provide
 * specific error handling for ticket purchase scenarios.
 */
export default class InvalidPurchaseException extends Error {
    /**
     * Creates an instance of InvalidPurchaseException.
     * @param {string} message - The error message to be displayed.
     */
    constructor(message) {
      // Call the parent constructor with the error message
      super(message);
      
      // Set the name of this error to "InvalidPurchaseException"
      this.name = "InvalidPurchaseException";
    }
  }
  
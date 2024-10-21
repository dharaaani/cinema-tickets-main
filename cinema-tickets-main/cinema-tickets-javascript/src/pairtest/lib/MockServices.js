// src/pairtest/lib/MockServices.js

/**
 * Mock class to simulate the behavior of a ticket payment service.
 * This class is used for testing purposes and does not perform
 * real payment transactions.
 */
class MockTicketPaymentService {
    /**
     * Simulates making a payment for tickets.
     * @param {number} accountId - The ID of the account making the payment.
     * @param {number} amount - The total amount to be paid.
     */
    makePayment(accountId, amount) {
      // Log the payment details to the console
      console.log(`Payment of £${amount} made for account ID: ${accountId}`);
    }
  }
  
  /**
   * Mock class to simulate the behavior of a seat reservation service.
   * This class is used for testing purposes and does not perform
   * real seat reservations.
   */
  class MockSeatReservationService {
    /**
     * Simulates reserving seats for a given account.
     * @param {number} accountId - The ID of the account for which seats are reserved.
     * @param {number} totalSeats - The total number of seats to be reserved.
     */
    reserveSeat(accountId, totalSeats) {
      // Log the seat reservation details to the console
      console.log(`Reserved ${totalSeats} seats for account ID: ${accountId}`);
    }
  }
  
  // Exporting the mock services for use in other modules
  export { MockTicketPaymentService, MockSeatReservationService };
  
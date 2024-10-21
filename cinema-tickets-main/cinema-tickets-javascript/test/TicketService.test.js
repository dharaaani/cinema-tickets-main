// src/pairtest/TicketService.test.js

import TicketService from './TicketService.js';
import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { MockTicketPaymentService, MockSeatReservationService } from './lib/MockServices.js';

/**
 * Test suite for the TicketService class.
 * This suite tests the functionality of the TicketService class,
 * including ticket purchase validation, payment processing, and seat reservations.
 */
describe('TicketService', () => {
  let ticketService;
  let mockPaymentService;
  let mockReservationService;

  // Setup a new TicketService instance before each test
  beforeEach(() => {
    mockPaymentService = new MockTicketPaymentService();
    mockReservationService = new MockSeatReservationService();
    ticketService = new TicketService(mockPaymentService, mockReservationService);
  });

  /**
   * Test case: Purchase valid tickets
   * This test ensures that purchasing valid tickets does not throw an error.
   */
  it('should purchase valid tickets successfully', () => {
    const accountId = 1;
    const ticketRequests = [
      new TicketTypeRequest('ADULT', 10),
      new TicketTypeRequest('CHILD', 5),
      new TicketTypeRequest('INFANT', 2),
    ];

    // Expect no errors to be thrown
    expect(() => {
      ticketService.purchaseTickets(accountId, ...ticketRequests);
    }).not.toThrow();
  });

  /**
   * Test case: Purchase more than 25 tickets
   * This test ensures that attempting to purchase more than 25 tickets throws an InvalidPurchaseException.
   */
  it('should throw an error when purchasing more than 25 tickets', () => {
    const accountId = 1;
    const ticketRequests = [
      new TicketTypeRequest('ADULT', 26), // More than 25 tickets
    ];

    expect(() => {
      ticketService.purchaseTickets(accountId, ...ticketRequests);
    }).toThrow(InvalidPurchaseException);
  });

  /**
   * Test case: Purchase child and infant tickets without an adult ticket
   * This test ensures that attempting to purchase child or infant tickets without an adult ticket throws an InvalidPurchaseException.
   */
  it('should throw an error when purchasing child or infant tickets without an adult ticket', () => {
    const accountId = 1;
    const ticketRequests = [
      new TicketTypeRequest('CHILD', 1), // Child ticket
      new TicketTypeRequest('INFANT', 1), // Infant ticket
    ];

    expect(() => {
      ticketService.purchaseTickets(accountId, ...ticketRequests);
    }).toThrow(InvalidPurchaseException);
  });

  /**
   * Test case: Purchase with an invalid account ID
   * This test ensures that passing an invalid account ID throws an InvalidPurchaseException.
   */
  it('should throw an error for invalid account ID', () => {
    const invalidAccountId = 0; // Invalid account ID
    const ticketRequests = [
      new TicketTypeRequest('ADULT', 1),
    ];

    expect(() => {
      ticketService.purchaseTickets(invalidAccountId, ...ticketRequests);
    }).toThrow(InvalidPurchaseException);
  });

  /**
   * Test case: Purchase with an invalid ticket type
   * This test ensures that passing an invalid ticket type throws an InvalidPurchaseException.
   */
  it('should throw an error for invalid ticket type', () => {
    const accountId = 1;
    const ticketRequests = [
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('INVALID_TYPE', 1), // Invalid ticket type
    ];

    expect(() => {
      ticketService.purchaseTickets(accountId, ...ticketRequests);
    }).toThrow(InvalidPurchaseException);
  });
});

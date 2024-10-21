// src/pairtest/TicketService.js

import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

/**
 * Service class for handling ticket purchases and reservations.
 * It validates ticket requests, calculates total amounts and reserves seats.
 */
export default class TicketService {
  #ticketPaymentService; // Service responsible for processing payments
  #seatReservationService; // Service responsible for reserving seats

  /**
   * Creates an instance of TicketService.
   * @param {Object} ticketPaymentService - The service to handle payment processing.
   * @param {Object} seatReservationService - The service to handle seat reservations.
   */
  constructor(ticketPaymentService, seatReservationService) {
    this.#ticketPaymentService = ticketPaymentService;
    this.#seatReservationService = seatReservationService;
  }

  /**
   * Purchases tickets based on the account ID and requested ticket types.
   * Validates inputs, calculates total amounts, and processes payment and seat reservation.
   * @param {number} accountId - The ID of the account purchasing tickets.
   * @param {...TicketTypeRequest} ticketTypeRequests - The types and quantities of tickets requested.
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateAccountId(accountId); // Validate the account ID
    this.#validatePurchase(ticketTypeRequests); // Validate the ticket purchase requests

    const totalAmount = this.#calculateTotalAmount(ticketTypeRequests); // Calculate total amount
    const totalSeats = this.#calculateTotalSeats(ticketTypeRequests); // Calculate total seats to reserve

    // Make payment and reserve seats
    this.#ticketPaymentService.makePayment(accountId, totalAmount);
    this.#seatReservationService.reserveSeat(accountId, totalSeats);
  }

  /**
   * Validates the account ID.
   * @param {number} accountId - The account ID to validate.
   * @throws {InvalidPurchaseException} - If the account ID is not valid.
   */
  #validateAccountId(accountId) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException('Invalid account ID');
    }
  }

  /**
   * Validates the ticket purchase requests.
   * @param {Array<TicketTypeRequest>} ticketTypeRequests - The ticket requests to validate.
   * @throws {InvalidPurchaseException} - If any validation rule is violated.
   */
  #validatePurchase(ticketTypeRequests) {
    // Calculate the total number of tickets requested
    const totalTickets = ticketTypeRequests.reduce((sum, request) => sum + request.getNoOfTickets(), 0);
    if (totalTickets > 25) {
      throw new InvalidPurchaseException('Cannot purchase more than 25 tickets');
    }

    // Check for required ticket types
    const hasAdult = ticketTypeRequests.some(request => request.getTicketType() === 'ADULT');
    const hasChildOrInfant = ticketTypeRequests.some(request => ['CHILD', 'INFANT'].includes(request.getTicketType()));
    
    if (hasChildOrInfant && !hasAdult) {
      throw new InvalidPurchaseException('Child or Infant tickets cannot be purchased without an Adult ticket');
    }

    // Additional check for valid ticket types
    const validTicketTypes = ['ADULT', 'CHILD', 'INFANT'];
    for (const request of ticketTypeRequests) {
      if (!validTicketTypes.includes(request.getTicketType())) {
        throw new InvalidPurchaseException(`Invalid ticket type: ${request.getTicketType()}`);
      }
    }
  }

  /**
   * Calculates the total amount to be paid for the requested tickets.
   * @param {Array<TicketTypeRequest>} ticketTypeRequests - The ticket requests to calculate the total amount for.
   * @returns {number} - The total amount to be paid.
   */
  #calculateTotalAmount(ticketTypeRequests) {
    const prices = { ADULT: 25, CHILD: 15, INFANT: 0 };
    return ticketTypeRequests.reduce((total, request) => {
      return total + (prices[request.getTicketType()] * request.getNoOfTickets());
    }, 0);
  }

  /**
   * Calculates the total number of seats to reserve based on the ticket requests.
   * @param {Array<TicketTypeRequest>} ticketTypeRequests - The ticket requests to calculate total seats for.
   * @returns {number} - The total number of seats to be reserved.
   */
  #calculateTotalSeats(ticketTypeRequests) {
    return ticketTypeRequests.reduce((total, request) => {
      return total + (request.getTicketType() !== 'INFANT' ? request.getNoOfTickets() : 0);
    }, 0);
  }
}

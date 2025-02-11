import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import { TICKET_PRICES, MIN_TICKETS, MAX_TICKETS } from "./lib/constants.js";


export default class TicketService {
  constructor(accountId, ...ticketTypeRequests) {
    this.accountId = accountId;
    this.ticketTypeRequests = ticketTypeRequests;
    this.ticketPaymentService = new TicketPaymentService();
    this.seatReservationService = new SeatReservationService();
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.ticketValidation(ticketTypeRequests);
    const { totalAmountToPay, totalSeatsToAllocate, ticketPerAdultType, ticketPerChildType, ticketPerInfantType } = this.calculateTotalAmountAndSeats(ticketTypeRequests);

    this.ticketPaymentService.makePayment(accountId, totalAmountToPay);
    this.seatReservationService.reserveSeat(accountId, totalSeatsToAllocate);

    this.logPurchaseDetails(ticketPerAdultType, ticketPerChildType, ticketPerInfantType, totalSeatsToAllocate, totalAmountToPay);
  }

  calculateTotalAmountAndSeats(ticketTypeRequests) {
    let totalAmountToPay = 0;
    let totalSeatsToAllocate = 0;
    let ticketPerAdultType = 0;
    let ticketPerChildType = 0;
    let ticketPerInfantType = 0;

    for (let ticket of ticketTypeRequests) {
      const ticketType = ticket.getTicketType();
      const ticketQuantity = ticket.getNoOfTickets();

      switch (ticketType) {
        case "ADULT":
          ticketPerAdultType += ticketQuantity;
          totalAmountToPay += TICKET_PRICES.ADULT * ticketQuantity;
          totalSeatsToAllocate += ticketQuantity;
          break;
        case "CHILD":
          ticketPerChildType += ticketQuantity;
          totalAmountToPay += TICKET_PRICES.CHILD * ticketQuantity;
          totalSeatsToAllocate += ticketQuantity;
          break;
        case "INFANT":
          ticketPerInfantType += ticketQuantity;
          break;
      }
    }

    return { totalAmountToPay, totalSeatsToAllocate, ticketPerAdultType, ticketPerChildType, ticketPerInfantType };
  }

  ticketValidation(ticketTypeRequests) {
    let hasAdult = false;
    let totalTicketQuantity = 0;

    for (const ticket of ticketTypeRequests) {
      const ticketType = ticket.getTicketType();
      const totalTickets = ticket.getNoOfTickets();

      if (totalTickets < MIN_TICKETS || totalTickets > MAX_TICKETS) {
        throw new InvalidPurchaseException(`Invalid ticket quantity for ${ticketType} requested. Allowed range: ${MIN_TICKETS}-${MAX_TICKETS}`);
      }
      if (ticketType === "ADULT") {
        hasAdult = true;
      }
      totalTicketQuantity += totalTickets;
    }

    if (!hasAdult) {
      throw new InvalidPurchaseException("At least one adult ticket is required for purchase.");
    }
  }

  getTicketPrice(type) {
    const price = TICKET_PRICES[type];
    if (price !== undefined) return price;
    throw new InvalidPurchaseException(`Invalid ticket type: ${type}`);
  }

  logPurchaseDetails(ticketPerAdultType, ticketPerChildType, ticketPerInfantType, totalSeatsToAllocate, totalAmountToPay) {
    console.log("Total purchase by ticket type:");
    console.log(`Adult: ${ticketPerAdultType}, Child: ${ticketPerChildType}, Infant: ${ticketPerInfantType}`);
    console.log(`Total Seats Reservations To Allocate: ${totalSeatsToAllocate}`);
    console.log(`Total Ticket Amount To Pay: £${totalAmountToPay.toFixed(2)}`);
  }
}

var ticketService = new TicketService();
ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 2), new TicketTypeRequest("CHILD", 1), new TicketTypeRequest("INFANT", 1));

import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketPaymentService from "../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../src/thirdparty/seatbooking/SeatReservationService";

jest.mock("../src/thirdparty/paymentgateway/TicketPaymentService.js");
jest.mock("../src/thirdparty/seatbooking/SeatReservationService");

describe("TicketService", () => {
  let ticketService;
  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("Throw InvalidPurchaseException if no 'ADULT' ticket is included during purchase", () => {
    const ticketTypeRequestChild = new TicketTypeRequest("CHILD", 1);

    expect(() =>
      ticketService.purchaseTickets(1, ticketTypeRequestChild)
    ).toThrow(InvalidPurchaseException);
  });

  it("Throw InvalidPurchaseException if total tickets exceeds more than 20 at given time", () => {
    const ticketTypeRequestAdult = new TicketTypeRequest("ADULT", 21);

    expect(() =>
      ticketService.purchaseTickets(1, ticketTypeRequestAdult)
    ).toThrow(InvalidPurchaseException);
  });

  it("Calculate total price correctly and make payment and reserve seats", () => {
    const ticketTypeRequestAdult = new TicketTypeRequest("ADULT", 1);
    const ticketTypeRequestChild = new TicketTypeRequest("CHILD", 1);

    TicketPaymentService.mockImplementation(() => {
      return {
        makePayment: jest.fn(() => "Payment successful"),
      };
    });

    SeatReservationService.mockImplementation(() => {
      return {
        reserveSeat: jest.fn(),
      };
    });

    const response = ticketService.purchaseTickets(
      1,
      ticketTypeRequestAdult,
      ticketTypeRequestChild
    );
  });

  it("Successfully puchase tickets", () => {
    expect(ticketService.getTicketPrice("INFANT")).toBe(0);
    expect(ticketService.getTicketPrice("CHILD")).toBe(10);
    expect(ticketService.getTicketPrice("ADULT")).toBe(20);
  });

  it("Throw an InvalidPurchaseException for an invalid ticket type", () => {
    expect(() => ticketService.getTicketPrice("INVALID_TYPE")).toThrow(
      InvalidPurchaseException
    );
  });

  it("Throw an InvalidPurchaseException for null ticket type", () => {
    expect(() => ticketService.getTicketPrice(null)).toThrow(
      InvalidPurchaseException
    );
  });

  it("Throw an InvalidPurchaseException for interger ticket type", () => {
    expect(() => ticketService.getTicketPrice(1)).toThrow(
      InvalidPurchaseException
    );
  });
});

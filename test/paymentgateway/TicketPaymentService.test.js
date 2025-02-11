import TicketPaymentService from "../../src/thirdparty/paymentgateway/TicketPaymentService";

describe("TicketPaymentService", () => {
  let ticketPaymentService;

  beforeEach(() => {
    ticketPaymentService = new TicketPaymentService();
  });

  it("should not throw an error for valid inputs", () => {
    expect(() => ticketPaymentService.makePayment(1, 100)).not.toThrow();
  });

  it("should throw a TypeError if accountId is not an integer", () => {
    expect(() => ticketPaymentService.makePayment("1", 100)).toThrow(TypeError);
    expect(() => ticketPaymentService.makePayment(null, 100)).toThrow(TypeError);
    expect(() => ticketPaymentService.makePayment(undefined, 100)).toThrow(TypeError);
    expect(() => ticketPaymentService.makePayment(1.5, 100)).toThrow(TypeError);
  });

  it("should throw a TypeError if totalAmountToPay is not an integer", () => {
    expect(() => ticketPaymentService.makePayment(1, "100")).toThrow(TypeError);
    expect(() => ticketPaymentService.makePayment(1, null)).toThrow(TypeError);
    expect(() => ticketPaymentService.makePayment(1, undefined)).toThrow(TypeError);
    expect(() => ticketPaymentService.makePayment(1, 100.5)).toThrow(TypeError);
  });
});

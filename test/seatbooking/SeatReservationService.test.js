import SeatReservationService from "../../src/thirdparty/seatbooking/SeatReservationService";

describe("SeatReservationService", () => {
  let seatReservationService;

  beforeEach(() => {
    seatReservationService = new SeatReservationService();
  });

  it("should not throw an error for valid integer inputs", () => {
    expect(() => seatReservationService.reserveSeat(1, 5)).not.toThrow();
  });

  it("should throw a TypeError if accountId is not an integer", () => {
    expect(() => seatReservationService.reserveSeat("1", 5)).toThrow(TypeError);
    expect(() => seatReservationService.reserveSeat(null, 5)).toThrow(TypeError);
    expect(() => seatReservationService.reserveSeat(undefined, 5)).toThrow(TypeError);
    expect(() => seatReservationService.reserveSeat(1.5, 5)).toThrow(TypeError);
  });

  it("should throw a TypeError if totalSeatsToAllocate is not an integer", () => {
    expect(() => seatReservationService.reserveSeat(1, "5")).toThrow(TypeError);
    expect(() => seatReservationService.reserveSeat(1, null)).toThrow(TypeError);
    expect(() => seatReservationService.reserveSeat(1, undefined)).toThrow(TypeError);
    expect(() => seatReservationService.reserveSeat(1, 5.5)).toThrow(TypeError);
  });
});

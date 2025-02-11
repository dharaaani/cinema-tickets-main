import { TICKET_PRICES, MIN_TICKETS, MAX_TICKETS } from "../../src/pairtest/lib/Constants";

describe("Constants", () => {
  it("should have the correct TICKET_PRICES", () => {
    expect(TICKET_PRICES).toEqual({
      INFANT: 0,
      CHILD: 10,
      ADULT: 20,
    });
  });

  it("should have the correct value for MIN_TICKETS", () => {
    expect(MIN_TICKETS).toBe(1);
  });

  it("should have the correct value for MAX_TICKETS", () => {
    expect(MAX_TICKETS).toBe(20);
  });
});

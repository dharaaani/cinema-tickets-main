import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";

describe("TicketTypeRequest Class", () => {
  it("Create a new instance of 'TicketTypeRequest' successfully", () => {
    const ticketTypeRequest = new TicketTypeRequest("ADULT", 1);

    expect(ticketTypeRequest.getTicketType()).toEqual("ADULT");
    expect(ticketTypeRequest.getNoOfTickets()).toEqual(1);
  });

  it("Throw an error for invalid ticket type", () => {
    expect(() => new TicketTypeRequest("INVALID_TYPE", 1)).toThrow(
      `Invalid type: INVALID_TYPE. Valid types are ADULT, CHILD, INFANT`
    );

    expect(() => new TicketTypeRequest(null, "RandomText")).toThrow(
      `Invalid type: null. Valid types are ADULT, CHILD, INFANT`
    );

    expect(() => new TicketTypeRequest(1, 1)).toThrow(
      `Invalid type: 1. Valid types are ADULT, CHILD, INFANT`
    );
  });

  it("Throw an error for invalid noOfTickets", () => {
    expect(() => new TicketTypeRequest("ADULT", "RandomText")).toThrow(
      "noOfTickets must be a positive integer"
    );

    expect(() => new TicketTypeRequest("ADULT", null)).toThrow(
      "noOfTickets must be a positive integer"
    );
  });
});

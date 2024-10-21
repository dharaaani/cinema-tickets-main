
export default class TicketTypeRequest {
  #type;
  #noOfTickets;

  //  Constructor for TicketTypeRequest class
  constructor(type, noOfTickets) {
    if (!['ADULT', 'CHILD', 'INFANT'].includes(type)) {
      throw new TypeError('type must be ADULT, CHILD, or INFANT');
    }

    if (!Number.isInteger(noOfTickets) || noOfTickets <= 0) {
      throw new TypeError('noOfTickets must be a positive integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  //  Getter methods for type and noOfTickets
  getNoOfTickets() {
    return this.#noOfTickets;
  }

  //  Getter method for type
  getTicketType() {
    return this.#type;
  }
} 
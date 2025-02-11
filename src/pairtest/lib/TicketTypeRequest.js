/**
  Immutable Object.
*/
export default class TicketTypeRequest {
  static #Type = ['ADULT', 'CHILD', 'INFANT'];

  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!TicketTypeRequest.#Type.includes(type)) {
      throw new TypeError(`Invalid type: ${type}. Valid types are ${TicketTypeRequest.#Type.join(', ')}`);
    }

    if (!Number.isInteger(noOfTickets) || noOfTickets < 0) {
      throw new TypeError('noOfTickets must be a positive integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }
}

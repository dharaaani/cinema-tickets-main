// main.js

// Import necessary classes and functions
import TicketService from './pairtest/TicketService.js'; // TicketService class
import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js'; //Encapsulates a ticket request
import InvalidPurchaseException from './pairtest/lib/InvalidPurchaseException.js'; //Custom exception class
import { MockTicketPaymentService, MockSeatReservationService } from './pairtest/lib/MockServices.js'; // Mock services for demonstration
import readline from 'readline';

// Mock services for demonstration
const ticketPaymentService = new MockTicketPaymentService();
const seatReservationService = new MockSeatReservationService();
const ticketService = new TicketService(ticketPaymentService, seatReservationService);

// Menu options
const ticketTypes = [
  { type: 'ADULT', price: 25 },
  { type: 'CHILD', price: 15 },
  { type: 'INFANT', price: 0 }
];

// Create an interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to display menu and get ticket requests
function showMenu() {
  console.log('\nSelect ticket types and quantities (Type "done" to finish):');
  ticketTypes.forEach((ticket, index) => {
    console.log(`${index + 1}. ${ticket.type} - £${ticket.price}`);
  });
}

// Function to get ticket requests from user input
function getTicketRequests() {
  return new Promise((resolve) => {
    const ticketRequests = [];
    
    const askForTickets = () => {
      showMenu();
      rl.question('Enter ticket type (1, 2, or 3) or "done" to finish: ', (answer) => {
        if (answer.toLowerCase() === 'done') {
          return resolve(ticketRequests);
        }

        const ticketIndex = parseInt(answer) - 1;
        if (ticketIndex >= 0 && ticketIndex < ticketTypes.length) {
          rl.question(`How many ${ticketTypes[ticketIndex].type} tickets would you like to buy? `, (quantity) => {
            const numTickets = parseInt(quantity);
            if (!isNaN(numTickets) && numTickets > 0) {
              const request = new TicketTypeRequest(ticketTypes[ticketIndex].type, numTickets);
              ticketRequests.push(request);
              askForTickets();
            } else {
              console.log('Please enter a valid number of tickets.');
              askForTickets();
            }
          });
        } else {
          console.log('Invalid choice. Please select a valid ticket type.');
          askForTickets();
        }
      });
    };

    askForTickets();
  });
}

// Main function to handle user input and purchase tickets
async function main() {
  rl.question('Enter your account ID (greater than 0): ', async (accountId) => {
    const id = parseInt(accountId);
    if (id > 0) {
      try {
        const ticketRequests = await getTicketRequests();
        if (ticketRequests.length === 0) {
          console.log('No tickets requested. Exiting...');
          rl.close();
          return;
        }
        
        ticketService.purchaseTickets(id, ...ticketRequests);
        console.log('Ticket purchase successful!');
      } catch (error) {
        if (error instanceof InvalidPurchaseException) {
          console.error('Purchase failed:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        rl.close();
      }
    } else {
      console.log('Invalid account ID. Must be greater than 0.');
      rl.close();
    }
  });
}

// Start the application
main();

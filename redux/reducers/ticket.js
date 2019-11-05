import { LOAD_TICKET_CONFIRMATION } from "../actionTypes";

const initialState = {
  first_name: null,
  last_name: null,
  phone: null,
  from: null,
  to: null,
  price: null,
  departure_day: null,
  departure_time: null,
  arrival_day: null,
  arrival_time: null,
  ticket_number: null,
  reference_number: null,
  service_charge: null,
  amount: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_TICKET_CONFIRMATION:
      const { ticket, journey, transaction, service_charge} = action.payload;
      return {
        first_name: ticket.first_name,
        last_name: ticket.last_name,
        phone: ticket.phone,
        from: journey.origin_name,
        to: journey.destination_name,
        price: journey.price,
        departure_day: journey.formatted_departure_date,
        departure_time: journey.formatted_departure,
        arrival_day: journey.formatted_arrival_date,
        arrival_time: journey.formatted_arrival,
        ticket_number: ticket.id,
        reference_number: ticket.reference_number,
        service_charge: service_charge,
        amount: ticket.amount
      };
    default:
      return state;
  }
}

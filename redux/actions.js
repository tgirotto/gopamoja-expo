import {
  LOAD_ORIGINS,
  LOAD_POPULAR_ORIGINS,
  LOAD_DESTINATIONS,
  LOAD_POPULAR_DESTINATIONS,
  SET_SEARCH_FROM,
  SET_SEARCH_TO,
  SET_SEARCH_DATE,
  SET_SEARCH_QUANTITY,
  INITIALISE_PASSENGERS,
  RESET_JOURNEYS,
  START_LOADING_JOURNEYS,
  END_LOADING_JOURNEYS,
  SELECT_JOURNEY,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PHONE,
  SET_PROMO,
  LOAD_TICKET_CONFIRMATION,
  SET_SEARCH_LOCATION
} from "./actionTypes";

export const loadOrigins = (origins) => {
  return {
    type: LOAD_ORIGINS,
    payload: {
      origins: origins
    }
  };
}

export const loadPopularOrigins = (popular_origins) => {
  return {
    type: LOAD_POPULAR_ORIGINS,
    payload: {
      popular_origins: popular_origins
    }
  };
}

export const loadDestinations = (destinations) => {
  return {
    type: LOAD_DESTINATIONS,
    payload: {
      destinations: destinations
    }
  };
}

export const loadPopularDestinations = (popular_destinations) => {
  return {
    type: LOAD_POPULAR_DESTINATIONS,
    payload: {
      popular_destinations: popular_destinations
    }
  };
}

export const setSearchFrom = (id, name) => {
  return {
    type: SET_SEARCH_FROM,
    payload: {
      from_id: id,
      from_name: name
    }
  };
}

export const setSearchTo = (id, name) => {
  return {
    type: SET_SEARCH_TO,
    payload: {
      to_id: id,
      to_name: name
    }
  };
}

export const setSearchDate = (date) => ({
  type: SET_SEARCH_DATE,
  payload: {
    date: date
  }
});

export const setSearchLocation = (location) => ({
  type: SET_SEARCH_LOCATION,
  payload: {
    location: location
  }
});

export const setSearchQuantity = (quantity) => ({
 type: SET_SEARCH_QUANTITY,
 payload: {
   quantity: quantity
 }
});

export const initialisePassengers = () => ({
 type: INITIALISE_PASSENGERS,
 payload: {}
});

export const startLoadingJourneys = () => {
  return {
    type: START_LOADING_JOURNEYS,
    payload: {}
  };
}

export const endLoadingJourneys = (journeys) => {
  return {
    type: END_LOADING_JOURNEYS,
    payload: {
      journeys: journeys
    }
  };
}

export const resetJourneys = () => ({
 type: RESET_JOURNEYS,
 payload: {}
});

export const selectJourney = (journey) => ({
 type: SELECT_JOURNEY,
 payload: {
   journey: journey
 }
});

export const setFirstName = (first_name) => ({
 type: SET_FIRST_NAME,
 payload: {
   first_name: first_name
 }
});

export const setLastName = (last_name) => ({
 type: SET_LAST_NAME,
 payload: {
   last_name: last_name
 }
});

export const setPhone = (phone) => ({
 type: SET_PHONE,
 payload: {
   phone: phone
 }
});

export const setPromo = (promo) => ({
 type: SET_PROMO,
 payload: {
   promo: promo
 }
});

export const loadTicketConfirmation = (ticket, journey, transaction, service_charge) => ({
 type: LOAD_TICKET_CONFIRMATION,
 payload: {
   transaction: transaction,
   ticket: ticket,
   journey: journey,
   service_charge: service_charge
 }
});

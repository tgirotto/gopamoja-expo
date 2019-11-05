import {
  LOAD_ORIGINS,
  LOAD_POPULAR_ORIGINS,
  LOAD_DESTINATIONS,
  LOAD_POPULAR_DESTINATIONS } from "../actionTypes";

const initialState = {
  origins: [],
  destinations: [],
  popular_origins: [],
  popular_destinations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_POPULAR_ORIGINS:
      const { popular_origins } = action.payload;
      let new_popular_origins = [];
      for(var i = 0; i < popular_origins.length; i++) {
        new_popular_origins.push({
          id: popular_origins[i].id,
          name: popular_origins[i].name
        });
      }

      return {...state, popular_origins: new_popular_origins};
    case LOAD_ORIGINS:
      const { origins } = action.payload;
      let new_origins = [];
      for(var i = 0; i < origins.length; i++) {
        new_origins.push({
          id: origins[i].id,
          name: origins[i].name
        });
      }

      return {...state, origins: new_origins };
    case LOAD_POPULAR_DESTINATIONS:
      const { popular_destinations } = action.payload;
      let new_popular_destinations = [];
      for(var i = 0; i < popular_destinations.length; i++) {
        new_popular_destinations.push({
          id: popular_destinations[i].id,
          name: popular_destinations[i].name
        });
      }

      return {...state, popular_destinations: new_popular_destinations};
    case LOAD_DESTINATIONS:
      const { destinations } = action.payload;
      let new_destinations = [];
      for(var i = 0; i < destinations.length; i++) {
        new_destinations.push({
          id: destinations[i].id,
          name: destinations[i].name
        });
      }

      return {...state, destinations: new_destinations };
    default:
      return state;
  }
}

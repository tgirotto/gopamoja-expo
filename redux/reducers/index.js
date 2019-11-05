import { combineReducers } from "redux";

import origins_destinations from "./origins_destinations";
import search from "./search";
import journeys from "./journeys";
import details from "./details";
import ticket from "./ticket";

export default combineReducers({origins_destinations, search, journeys, details, ticket});

import { combineReducers } from "redux";

import origins_destinations from "./origins_destinations";
import search from "./search";
import journeys from "./journeys";
import details from "./details";
import ticket from "./ticket";
import gallery from "./gallery";
import layout from "./layout";

export default combineReducers({origins_destinations, search, journeys, details, ticket, gallery, layout});

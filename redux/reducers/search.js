import { SET_SEARCH_FROM,
         SET_SEARCH_TO,
         SET_SEARCH_DATE,
         SET_SEARCH_QUANTITY,
         SET_SEARCH_LOCATION,
         INITIALISE_PASSENGERS } from "../actionTypes";

function getTomorrow() {
  let now = new Date();
  now.setDate(now.getDate() + 1);
  return now;
}

const initialState = {
  from_id: 2,
  from_name: 'Mbeya Central',
  to_id: 1,
  to_name: 'Dar Es Salaam Ubungo',
  quantity: 1,
  date: getTomorrow(),
  quantities: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ],
  passengers: [],
  location: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_FROM:
      const { from_id, from_name } = action.payload;
      return {...state, from_id: from_id, from_name: from_name};
    case SET_SEARCH_TO:
      const { to_id, to_name } = action.payload;
      return {...state, to_id: to_id, to_name: to_name};
    case SET_SEARCH_DATE:
      const { date } = action.payload;
      return {...state, date: date};
    case SET_SEARCH_QUANTITY:
      const { quantity } = action.payload;
      return {...state, quantity: quantity};
    case SET_SEARCH_LOCATION:
      const { location } = action.payload;
      return {...state, location: location};
    case INITIALISE_PASSENGERS:
      let passengers = [];

      for(var i = 0; i < quantity; i++) {
        passengers.push({
          first_name: null,
          last_name: null,
          phone: null,
          promo: null
        })
      }
      return {...state, passengers: passengers};
    default:
      return state;
  }
}

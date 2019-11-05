import { SET_FIRST_NAME, SET_LAST_NAME, SET_PHONE, SET_PROMO } from "../actionTypes";

const initialState = {
  first_name: null,
  last_name: null,
  phone: null,
  promo: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FIRST_NAME:
      const { first_name } = action.payload;
      return {...state, first_name: first_name}
    case SET_LAST_NAME:
      const { last_name } = action.payload;
      return {...state, last_name: last_name}
    case SET_PHONE:
      const { phone } = action.payload;
      return {...state, phone: phone}
    case SET_PROMO:
      const { promo } = action.payload;
      return {...state, promo: promo}
    default:
      return state;
  }
}

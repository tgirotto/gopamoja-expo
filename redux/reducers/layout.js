import { RESET_LAYOUT, START_LOADING_LAYOUT, END_LOADING_LAYOUT, SELECT_SEAT} from "../actionTypes";

const initialState = {
  loading_layout: false,
  layout: '',
  seat: {
    row: null,
    column: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_LAYOUT:
      return {...state, loading_layout: true, layout: ''};
    case END_LOADING_LAYOUT:
      const { layout } = action.payload;
      return {...state, loading_layout: false, layout: layout};
    case SELECT_SEAT:
      const { row, column } = action.payload;
      return {...state, seat: {row, column}}
    case RESET_LAYOUT:
      return {...state, seat: {row : null, column: null}}
    default:
      return state;
  }
}

import { END_LOADING_GALLERY, START_LOADING_GALLERY, RESET_GALLERY, SELECT_COMPANY} from "../actionTypes";

const initialState = {
  images: [],
  loading_images: true,
  company_id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_GALLERY:
      return {...state, images: []}
    case END_LOADING_GALLERY:
      const { images } = action.payload;
      let new_images= [];
      for(var i = 0; i < images.length; i++) {
        new_images.push(images[i]);
      }

      return {...state, images: new_images, loading_images: false};
    case START_LOADING_GALLERY:
      return {...state, loading_images: true};
    case SELECT_COMPANY:
      const { company_id } = action.payload;
      return {...state, company_id: company_id};
    default:
      return state;
  }
}

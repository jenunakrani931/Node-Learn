import {
  PRODUCT_ADD_FAILURE,
  PRODUCT_ADD_SUCCESSFULLY,
  PRODUCT_FETCH_BYID_SUCCESSFULLY,
  PRODUCT_FETCH_SUCCESSFULLY,
} from "../types";

const initialState = {
  product: [],
  fetchByID: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ADD_SUCCESSFULLY:
      return {
        ...state,
        product: action.payload,
      };
    case PRODUCT_ADD_FAILURE:
      return {
        ...state,
        product: action.payload,
      };
    case PRODUCT_FETCH_SUCCESSFULLY:
      return {
        ...state,
        product: action.payload,
      };
    case PRODUCT_FETCH_BYID_SUCCESSFULLY:
      return {
        ...state,
        fetchByID: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;

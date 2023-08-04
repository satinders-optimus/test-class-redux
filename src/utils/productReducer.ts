import { ActionTypes, CartState } from "./types";

const initialState = {
  data: [],
  fetchedProductDetails: [],
};

export const productReducer = (
  state: CartState = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return { ...state, data: action.payload };
    case ActionTypes.FETCH:
      return { ...state, data: action.payload };
    case ActionTypes.FETCH_PRODUCT_DETAILS:
      return { ...state, fetchedProductDetails: action.payload };
    case ActionTypes.DELETE:
      return { ...state, data: action.payload };
    case ActionTypes.UPDATE:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

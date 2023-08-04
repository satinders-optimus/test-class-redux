export type Rating = {
  rate: number;
  count: number;
};

export type ListItem = {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  rating: Rating;
  title: string;
  editing?: boolean;
};

export type CartState = {
  data: ListItem[];
  fetchedProductDetails: any;
};

export enum ActionTypes {
  ADD = "add",
  FETCH = "fetch",
  UPDATE = "update",
  DELETE = "delete",
  EDIT = "edit",
  FETCH_PRODUCT_DETAILS = "fetch_product_details",
}

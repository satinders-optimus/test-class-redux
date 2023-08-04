import { Dispatch } from "redux";
import axios from "axios";
import { ActionTypes, CartState, ListItem } from "./types";

interface addData {
  type: ActionTypes.ADD;
  payload: ListItem[];
}

interface fetchProducts {
  type: ActionTypes.FETCH;
  payload: ListItem[];
}

interface deleteData {
  type: ActionTypes.DELETE;
  payload: ListItem[];
}
interface Edit {
  type: ActionTypes.EDIT;
  payload: ListItem;
}
interface updateData {
  type: ActionTypes.UPDATE;
  payload: ListItem[];
}

interface fetchProductDetails {
  type: ActionTypes.FETCH_PRODUCT_DETAILS;
  payload: ListItem;
}

const baseUrl = "https://fakestoreapi.com";

export const fetchProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    const data = await axios
      .get(baseUrl + "/products")
      .then((resp: any) => resp?.data);

    dispatch({
      type: ActionTypes.FETCH,
      payload: data,
    });
  };
};

export const fetchProductDetails = (id: any) => {
  return async (dispatch: Dispatch<Action>) => {
    const data = await axios
      .get(baseUrl + "/products/" + id)
      .then((resp: any) => resp?.data);
    dispatch({
      type: ActionTypes.FETCH_PRODUCT_DETAILS,
      payload: data,
    });
  };
};

export const addData = (item: any, data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const dataObj = {
        title: item?.product?.name,
        price: item?.product?.price,
        description: item?.product?.description,
        image: item?.product?.image,
        category: item?.product?.category,
      };

      const resp: any = await axios
        .post(baseUrl + "/products", dataObj)
        .then((response) => response.data);

      dispatch({
        type: ActionTypes.ADD,
        payload: [...data, resp],
      });
    } catch (err) {}
  };
};

export const deleteData = (delItem: any, data: ListItem[]) => {
  console.log(data, delItem, "delItem new item");
  return async (dispatch: Dispatch<Action>) => {
    const resp: any = await axios
      .delete("https://fakestoreapi.com/products/" + delItem?.id)
      .then((response) => response.data);
    console.log(resp, "resppp");

    const filteredArray = data?.filter((item: any) => item.id != resp?.id);
    console.log(delItem);
    console.log(filteredArray, "filteredArray**");

    dispatch({
      type: ActionTypes.DELETE,
      payload: filteredArray,
    });
  };
};

export const editDataFun = (list: ListItem) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.EDIT,
      payload: list,
    });
  };
};

export const updateData = (data: ListItem[], newItem: any) => {
  return async (dispatch: Dispatch<Action>) => {
    const updateObj = {
      title: newItem.name,
      category: newItem.category,
      price: newItem.price,
      image: newItem.image,
    };
    const updateResp: any = await axios
      .put(baseUrl + "/products/" + newItem.id, updateObj)
      .then((response) => response.data);
    const respArray = [updateResp];

    const newUpdatedList = data.map((item) => {
      return item.id == updateResp.id
        ? {
            ...item,
            title: respArray[0].title,
            category: respArray[0].category,
            price: respArray[0].price,
            image: respArray[0].image,
          }
        : item;
    });

    dispatch({
      type: ActionTypes.UPDATE,
      payload: newUpdatedList,
    });
  };
};

export type Action =
  | addData
  | fetchProducts
  | deleteData
  | updateData
  | Edit
  | fetchProductDetails;

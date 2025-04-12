import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, SET_ITEMS, UPDATE_ITEM } from "../Constants";


// fetch Latest item 
export const fetchItems = () => ({
  type: FETCH_ITEMS,
});
//
export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

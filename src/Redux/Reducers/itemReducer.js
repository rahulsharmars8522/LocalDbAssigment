import { ADD_ITEM, DELETE_ITEM, SET_ITEMS, UPDATE_ITEM } from "../Constants";

const initialState = {
  localData: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, localData: action.payload };
    case ADD_ITEM:
      return { ...state, localData: [...state.localData, action.payload] };
    case UPDATE_ITEM:
      return {
        ...state,
        localData: state.localData.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        localData: state.localData.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default itemReducer;

import {
  LISTENING_PRODUCT_SUCCEEDED,
  LOADING_PRODUCTS_SUCCEEDED,
  UPDATING_PRODUCTS_SUCCEEDED,
  REMOVING_PRODUCTS_SUCCEEDED,
} from '../constants/ActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  list: {},
  viewed: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case LISTENING_PRODUCT_SUCCEEDED: {
      return { ...state, viewed: action.payload };
    }

    case LOADING_PRODUCTS_SUCCEEDED: {
      const { uid, key, value } = action.payload;
      return { ...state, list: { ...state.list, [uid]: { ...state.list[uid], [key]: value } } };
    }

    case UPDATING_PRODUCTS_SUCCEEDED: {
      const { uid, key ,value } = action.payload;
      return { ...state, list: { ...state.list, [uid]: { ...state.list[uid], [key]: value } } };
    }
    
    case REMOVING_PRODUCTS_SUCCEEDED: {
      const { uid, key, value } = action.payload;
      return { ...state, list: { ...state.list, [uid]: _.omit(state.list[uid], key) } };
    }

    default:
      return state;
  }
}
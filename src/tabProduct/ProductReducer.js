import {
  LISTENING_PRODUCT_SUCCEEDED,
  LOADING_PRODUCTS_SUCCEEDED,
  UPDATING_PRODUCTS_SUCCEEDED,
  REMOVING_PRODUCTS_SUCCEEDED,
} from '../constants/ActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  list: {},
  viewed: {
    location: {
      0: 31,
      1: -171
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case LISTENING_PRODUCT_SUCCEEDED: {
      const { key, location } = action.payload;
      return { ...state, viewed: action.payload };
    }

    case LOADING_PRODUCTS_SUCCEEDED: {
      const { uid, key, value, location } = action.payload;
      const mergeValue = Object.assign({}, value)
      return { ...state, list: { ...state.list, [uid]: { ...state.list[uid], [key]: mergeValue } } };
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
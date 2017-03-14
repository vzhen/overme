import {
  LOGGING_USER_SUCCEEDED,
  LOGGINGOUT_USER_SUCCEEDED,
} from '../constants/ActionTypes';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGING_USER_SUCCEEDED:
      return { ...state, ...action.payload };
    case LOGGINGOUT_USER_SUCCEEDED:
      // TODO: need to clear all state
      return INITIAL_STATE;
    default:
      return state;
  }
};
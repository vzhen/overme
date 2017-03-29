import {
  LOGGING_USER_SUCCEEDED,
  LOGGINGOUT_USER_SUCCEEDED,
} from '../constants/ActionTypes';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case LOGGING_USER_SUCCEEDED:
      return { ...state, ...action.payload };

    // TODO: clear all state when use log out.
    case LOGGINGOUT_USER_SUCCEEDED:
      return INITIAL_STATE;

    case 'UPDATING_DISPLAY_NAME': 
      return { ...state, displayName: action.payload }

    case 'UPDATING_PROFILE_PHOTO_URL': 
      return { ...state, photoURL: action.payload }

    case 'DELETING_PROFILE_PHOTO_URL': 
      return { ...state, photoURL: action.payload }
    default:
      return state;
  }
};
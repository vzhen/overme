import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { uploadImage } from '../utility/image';

const database = firebase.database();

// BUG: when form is submitted, all tabs redux are dispatched.
const updateDisplayName = (displayName) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    
    // update firebase database.
    database.ref(`userProfile/${currentUser.uid}`).update({ displayName })
    currentUser.updateProfile({ displayName })

    // update react native async storage.
    AsyncStorage.mergeItem('auth', JSON.stringify({displayName}));

    // update redux store
    // NOTE!!!: Dispatch to AuthReducer
    dispatch({
      type: 'UPDATING_DISPLAY_NAME',
      payload: displayName
    })
  }
}

const updateProfilePicture = (image) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    
    // Upload to firebase storage.
    uploadImage(image, 'images/profiles').then((photoURL) => {
      // Update firebase database.
      database.ref(`userProfile/${currentUser.uid}`).update({ photoURL });
      currentUser.updateProfile({ photoURL });

      // update react native async storage.
      AsyncStorage.mergeItem('auth', JSON.stringify({photoURL}));

      // update redux store
      // NOTE!!!: Dispatch to AuthReducer
      dispatch({
        type: 'UPDATING_PROFILE_PHOTO_URL',
        payload: photoURL
      })
    });
  }
}

const deleteProfilePicture = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();

    // Update firebase database.
    database.ref(`userProfile/${currentUser.uid}`).update({ photoURL: null });
    currentUser.updateProfile({ photoURL: null });
    
    // update react native async storage.
    AsyncStorage.mergeItem('auth', JSON.stringify({photoURL: null}));

    // update redux store
    // NOTE!!!: Dispatch to AuthReducer
    dispatch({
      type: 'DELETING_PROFILE_PHOTO_URL',
      payload: null
    })
  }
}

export { updateDisplayName, updateProfilePicture, deleteProfilePicture }; 
import firebase from 'firebase';
import Auth0Lock from 'react-native-lock';
import { AsyncStorage } from 'react-native';
import { LOGGING_USER_SUCCEEDED, LOGGINGOUT_USER_SUCCEEDED } from '../constants/ActionTypes';
import { AUTH0_CLIENTID, AUTH0_DOMAIN } from '../constants/configs';
import { uploadImage } from '../app/actions';

const lock = new Auth0Lock({ clientId: AUTH0_CLIENTID, domain: AUTH0_DOMAIN });

const loggingUserSucceeded = (user) => ({
  type: LOGGING_USER_SUCCEEDED,
  payload: user
});

const loggingOutUserSucceeded = () => ({
  type: LOGGINGOUT_USER_SUCCEEDED
});


// 1. Show Auth0 SMS login form
// 2. Generate Auth0 delegation token
// 3. If delegation token success, sign in firebase
// 4. TODO: If delegation fail
const showAuth0LoginForm = (dispatch) => {
  lock.show({ connections: ['sms'], closable: true }, (error, profile, token) => {
    if (!error && token) {
      const { phone_number } = profile;
      const options = {
        refreshToken: token.refreshToken,
        apiType: 'firebase',
        scope: 'openid offline_access',
        target: AUTH0_CLIENTID,
      };
      lock.authenticationAPI().delegation(options)
        .then((delegationToken) => {
          firebase.auth().signInWithCustomToken(delegationToken.id_token)
            .then(auth => { signInFirebaseSuccess(dispatch, auth, phone_number)});
        })
        .catch(error => { console.log(error) });
    }
  });
};

// 1. Set AsyncStorage.
// 2. Merge AsyncStorage with user's phone number.
// 3. Get new merged AsyncStorage and dispatch 
const signInFirebaseSuccess = (dispatch, authData, phoneNumber) => {
  AsyncStorage.setItem('auth', JSON.stringify(authData));
  AsyncStorage.mergeItem('auth', JSON.stringify({phoneNumber}));
  AsyncStorage.getItem('auth').then((auth) => {
    const authParsed = JSON.parse(auth);
    dispatch(loggingUserSucceeded(authParsed));
  });
};


export const listeningUserProfile = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        const userProfileRef = firebase.database().ref(`userProfile/${user.uid}`);
        userProfileRef.on('child_added', (snapshot) => {

        })

        userProfileRef.on('child_changed', (snapshot) => {
          const updatedData = { [snapshot.key]: snapshot.val() };
          AsyncStorage.mergeItem('auth', JSON.stringify(updatedData));
          user.updateProfile(updatedData);
        });

        userProfileRef.on('child_removed', (snapshot) => {

        });
      }
    });
  }
}

// 1. Update 'user' AsyncStorage
// 2. Update firebase firebase.auth().currentUser
// 3. Update firebase userProfile node
// 4. Dispatch
export const setupProfile = (displayName, phoneNumber, photoURL) => {

  // Declare required variables.
  const { currentUser } = firebase.auth();
  const userProfileRef = firebase.database().ref(`userProfile/${currentUser.uid}`);

  return (dispatch) => {
    if (!photoURL || photoURL.startsWith('https')) {

      // Create user profile without photo
      userProfileRef.update({ displayName, phoneNumber }).then(() => { 
        dispatch(loggingUserSucceeded({ displayName, phoneNumber }));
        // Actions.tabbar({ type: 'reset' });
      });

    } else {

      // Create user profile with photo
      uploadImage(photoURL, 'images/profiles')
        .then((uploadedURL) => {
          userProfileRef.update({ displayName, phoneNumber, photoURL: uploadedURL })
            .then(() => { 
              dispatch(loggingUserSucceeded({ displayName, phoneNumber, photoURL: uploadedURL }));
              // Actions.tabbar({ type: 'reset' });
            });
        });

    };
  };
};

// 1. Check if user login
// 2. If logged, dispatch user
// 3. If not log in, show Auth0 SMS login form
export const checkIfUserLoggedIn = () => {
  return (dispatch) => {
    AsyncStorage.getItem('auth')
      .then((authJSON) => {
        const authParsed = JSON.parse(authJSON); 
        if (authParsed) {
          dispatch(loggingUserSucceeded(authParsed));
        } else {
          showAuth0LoginForm(dispatch);
        }
      });
  };
}

// 1.Remove async storage
// 2.Logout firebase.
// 4.Remove state
// 3.Redirect to splash screen
export const logout = () => {
  const asyncKeys = ['auth'];
  AsyncStorage.multiRemove(asyncKeys);
  firebase.auth().signOut();
  return (dispatch) => {
    dispatch(loggingOutUserSucceeded());
  }
}
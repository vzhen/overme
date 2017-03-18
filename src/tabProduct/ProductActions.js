import firebase from '../app/FirebaseInit';
import {
  LISTENING_PRODUCT_SUCCEEDED,
  LOADING_PRODUCTS_SUCCEEDED,
  UPDATING_PRODUCTS_SUCCEEDED,
  REMOVING_PRODUCTS_SUCCEEDED,
} from '../constants/ActionTypes';

const listeningProductSucceeded = (product) => ({
  type: LISTENING_PRODUCT_SUCCEEDED,
  payload: product
});


const loadingProductsSucceeded = (product) => ({
  type: LOADING_PRODUCTS_SUCCEEDED,
  payload: product
});

const updatingProductsSucceeded = (product) => ({
  type: UPDATING_PRODUCTS_SUCCEEDED,
  payload: product
});

const removingProductsSucceeded = (product) => ({
  type: REMOVING_PRODUCTS_SUCCEEDED,
  payload: product
});

export const getProductById = (id) => {
  return (dispatch) => {
    firebase.database().ref(`products/${id}`)
      .on('value', (snapshot) => {
        dispatch(listeningProductSucceeded({ key: snapshot.key, ...snapshot.val() }))
      })
  }
}

export const getProductsByUserId = (uid) => {
  return (dispatch) => {
    const ref = firebase.database().ref(`userProducts/${uid}`)
      ref.on('child_added', (snapshot) => {
        dispatch(loadingProductsSucceeded({ uid, key: snapshot.key, value: snapshot.val() }))
      })

      ref.on('child_changed', (snapshot) => {
        dispatch(updatingProductsSucceeded({ uid, key: snapshot.key, value: snapshot.val() }))
      })

      ref.on('child_removed', (snapshot) => {
        dispatch(updatingProductsSucceeded({ uid, key: snapshot.key, value: snapshot.val() }))
      })
  }
}
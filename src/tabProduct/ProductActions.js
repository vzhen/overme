import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'
import validator from 'validator';
import {
  LISTENING_PRODUCT_SUCCEEDED,
  LOADING_PRODUCTS_SUCCEEDED,
  UPDATING_PRODUCTS_SUCCEEDED,
  REMOVING_PRODUCTS_SUCCEEDED,
} from '../constants/ActionTypes';
import { uploadImage } from '../app/actions';

const listeningProductSucceeded = (product) => ({
  type: LISTENING_PRODUCT_SUCCEEDED,
  payload: product
});

const loadingProductsSucceeded = (products) => ({
  type: LOADING_PRODUCTS_SUCCEEDED,
  payload: products
});

const updatingProductsSucceeded = (product) => ({
  type: UPDATING_PRODUCTS_SUCCEEDED,
  payload: product
});

const removingProductsSucceeded = (product) => ({
  type: REMOVING_PRODUCTS_SUCCEEDED,
  payload: product
});

export const loadProduct = (id) => {
  return (dispatch) => {
    firebase.database().ref(`products/${id}`)
      .on('value', (snapshot) => {
        dispatch(listeningProductSucceeded({ key: snapshot.key, ...snapshot.val() }))
      })
  }
}

export const loadProducts = (uid) => {
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

export const createProduct = (name, price, description, photoURLs) => {
  
  // Declare require variables
  const { currentUser } = firebase.auth();
  const uploadPromises = [];
  const seller = {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid
  };
  
  return (dispatch) => {
    if (validator.isEmpty(name)) {
      
    }
    // // Upload photos.
    // for (let key in photoURLs) {
    //   if (photoURLs.hasOwnProperty(key)) {
    //     uploadPromises.push(uploadImage(photoURLs[key], 'images/products'));
    //   }
    // }

    // // Wait for the uploaded photo url
    // Promise.all(uploadPromises).then((urls) => {
    //   const photoObj = {};
    //   if (urls.length > 0) {
    //     // Prepare photo object reference
    //     for (let i = 0; i < urls.length; i++ ) {
    //       const photoPushed = firebase.database().ref().push();
    //       const photoKey = photoPushed.key;
    //       photoObj[photoKey] = urls[i];
    //     }
    //     firebase.database().ref('products')
    //       .push({ name, price, description, seller, photoURLs: photoObj })
    //       .then(() => { dispatch(NavigationActions.back()) })
    //   }
    // })
  }
}

export const updateProduct = (id, name, price, shippingFee, stock, description, photoURLs) => {
  const uploadPromises = [];
  return (dispatch) => {
    
    // Check if use select new photo
    for (let key in photoURLs) {
      if (photoURLs.hasOwnProperty(key)) {
        if (!photoURLs[key].startsWith('http')) {
          uploadPromises.push(uploadImage(photoURLs[key], 'images/products'));
        }
      }
    }

    // Wait the uploaded photo url and check if new uploaded photos
    Promise.all(uploadPromises).then((urls) => {
      const photoObj = {};
      if (urls.length > 0) {
        for (let i = 0; i < urls.length; i++ ) {
          const photoPushed = firebase.database().ref(`products/${id}/photoURLs`).push();
          const photoKey = photoPushed.key;
          photoObj[photoKey] = urls[i];
        }
        firebase.database().ref(`products/${id}/photoURLs`).update(photoObj);
      }
    })

    firebase.database().ref(`products/${id}`)
      .update({ name, price, shippingFee, stock, description })
      .then(() => {})
  }
}

export const deleteProduct = (id) => {
  return (dispatch) => {
    firebase.database().ref(`products/${id}`).remove()
  }
}

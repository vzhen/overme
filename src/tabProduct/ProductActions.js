import firebase from '../app/FirebaseInit';
import GeoFire from 'geofire';
import validator from 'validator';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';

import {
  LISTENING_PRODUCT_SUCCEEDED,
  LOADING_PRODUCTS_SUCCEEDED,
  UPDATING_PRODUCTS_SUCCEEDED,
  REMOVING_PRODUCTS_SUCCEEDED,
} from '../constants/ActionTypes';
import { uploadImage } from '../utility/image';

const rootRef = firebase.database().ref();
const productsRef = rootRef.child('products');
const userProductsRef = rootRef.child('userProducts');
const productGeoFire = new GeoFire(firebase.database().ref('productGeo'));

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
    productsRef.child(id)
      .on('value', (snapshot) => {
        productGeoFire.get(snapshot.key).then((location) => {
          dispatch(listeningProductSucceeded({
            location,
            key: snapshot.key,
            ...snapshot.val()
          }))
        })
      })
  }
}

export const getProductsByUserId = (uid) => {
  return (dispatch) => {
    const ref = userProductsRef.child(uid);
      ref.on('child_added', (snapshot) => {
        productGeoFire.get(snapshot.key).then((location) => {
          dispatch(loadingProductsSucceeded({
            uid,
            location,
            key: snapshot.key,
            value: snapshot.val()
          }))
        })
      })

      ref.on('child_changed', (snapshot) => {
        dispatch(updatingProductsSucceeded({ uid, key: snapshot.key, value: snapshot.val() }))
      })

      ref.on('child_removed', (snapshot) => {
        dispatch(updatingProductsSucceeded({ uid, key: snapshot.key, value: snapshot.val() }))
      })
  }
}

export const createProduct = (name, price, photoURLs, latlng, description) => {
  // TODO: disable form while submitting
  // TODO: enable form while wrong input

  // Declare require variables
  const { currentUser } = firebase.auth();
  const uploadPromises = [];
  const owner = {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid
  };
  return (dispatch) => {
    if (validator.isEmpty(name)) {
      console.log('name is required');
    } else if (!validator.isNumeric(price) && !validator.isDecimal(price)) {
      console.log('price must be number only.');
    } else if (_.isEmpty(photoURLs)) {
      console.log('photo is required');
    } else {
      for (let key in photoURLs) {
          // Make sure there is new photo picked
          if (photoURLs.hasOwnProperty(key)) {
            uploadPromises.push(uploadImage(photoURLs[key], 'images/products'));
          }
      }

      // Wait the uploaded photo url
      Promise.all(uploadPromises).then((urls) => {
        const photoObj = {};
        if (urls.length > 0) {
          // Prepare photo object reference
          for (let i = 0; i < urls.length; i++ ) {
            const photoPushed = rootRef.push();
            const photoKey = photoPushed.key;
            photoObj[photoKey] = urls[i];
          }
          const productData = { name, price, description, owner, photoURLs: photoObj };
          const newProductKey = productsRef.push().key;
          productGeoFire.set(newProductKey, latlng);
          productsRef.child(newProductKey)
            .update(productData)
            .then(() => {
              dispatch(NavigationActions.back());
            });
        }
      })
  
    }
  }
}

export const updateProduct = (key, name, price, photoURLs, latlng, description) => {
  const uploadPromises = [];
  return (dispatch) => {
    if (validator.isEmpty(name)) {
      console.log('name is required');
    } else if (!validator.isNumeric(price) && !validator.isDecimal(price)) {
      console.log('price must be number only.');
    } else if (_.isEmpty(photoURLs)) {
      console.log('photo is required');
    } else {
      
      for (let key in photoURLs) {
        if (photoURLs.hasOwnProperty(key)) {
          // Check if use select new photo
          if (!photoURLs[key].startsWith('http')) {
            uploadPromises.push(uploadImage(photoURLs[key], 'images/products'));
          }
        }
      }

      productGeoFire.set(key, latlng);
      productsRef.child(key)
        .update({ name, price, description })
        .then(() => {
          dispatch(NavigationActions.back());
        })
      
    }
  }
}
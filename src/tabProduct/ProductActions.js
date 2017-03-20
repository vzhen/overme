import firebase from '../app/FirebaseInit';
import GeoFire from 'geofire';
import {
  LISTENING_PRODUCT_SUCCEEDED,
  LOADING_PRODUCTS_SUCCEEDED,
  UPDATING_PRODUCTS_SUCCEEDED,
  REMOVING_PRODUCTS_SUCCEEDED,
} from '../constants/ActionTypes';
import { uploadImage } from '../app/actions';

const rootRef = firebase.database().ref();
const productsRef = rootRef.child('products');
const userProductsRef = rootRef.child('userProducts');
const productGeoRef = rootRef.child('productGeo');
const geoFire = new GeoFire(firebase.database().ref('productGeo'));

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
        dispatch(listeningProductSucceeded({ key: snapshot.key, ...snapshot.val() }))
      })
  }
}

export const getProductsByUserId = (uid) => {
  return (dispatch) => {
    const ref = userProductsRef.child(uid);
      ref.on('child_added', (snapshot) => {
        geoFire.get(snapshot.key).then((location) => {
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

export const createProduct = (name, price, description, photoUrls) => {
  // Declare require variables
  const { currentUser } = firebase.auth();
  const uploadPromises = [];
  const owner = {
    displayName: currentUser.displayName,
    photoUrl: currentUser.photoURL ,
    uid: currentUser.uid
  };
  
  return (dispatch) => {
    
    for (let key in photoUrls) {
      // Make sure there is new photo picked
      if (photoUrls.hasOwnProperty(key)) {
        uploadPromises.push(uploadImage(photoUrls[key], 'images/products'));
      }
    }

    // Wait the uploaded photo url
    Promise.all(uploadPromises).then((urls) => {
      const photoObj = {};
      if (urls.length > 0) {
        // Prepare photo object reference
        for (let i = 0; i < urls.length; i++ ) {
          const photoPushed = firebase.database().ref().push();
          const photoKey = photoPushed.key;
          photoObj[photoKey] = urls[i];
        }

        const productData = { name, price, description, owner, photoUrls: photoObj };
        const newProductKey = productsRef.push().key;
        // geoProductsRef.set(newProductKey, [37.78063, -122.41]);
        productsRef.child(newProductKey).update(productData)
      }
    })
  }
}
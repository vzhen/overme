import firebase from '../app/FirebaseInit';
import GeoFire from 'geofire';

const productsRef = firebase.database().ref('products');
const geoFire = new GeoFire(firebase.database().ref('productGeo'));

const getNearbyProducts = (center, radius) => {
  return (dispatch) => {
    geoFire.query({ center, radius})
      .on("key_entered", (key, location, distance) => {
        productsRef.child(key).once('value', (snapshot) => {
          dispatch({
            type: 'GETTING_NEARBY_PRODUCT',
            payload: { key, location, distance, value: snapshot.val() }
          })
        })
      });
    dispatch({
      type: 'GETTING_USER_LATLNG',
      payload: { center, radius }
    })
  }
}

export { getNearbyProducts };
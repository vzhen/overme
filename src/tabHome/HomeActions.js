import firebase from '../app/FirebaseInit';
import GeoFire from 'geofire';

const productsRef = firebase.database().ref('products');
const geoFire = new GeoFire(firebase.database().ref('productGeo'));

const getNearbyProducts = (radius) => {
  return (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition((position) => {
      geoFire.query({ center: [position.coords.latitude, position.coords.longitude], radius })
        .on("key_entered", (key, location, distance) => {
          productsRef.child(key).once('value', (snapshot) => {
            dispatch({
              type: 'GETTING_NEARBY_PRODUCTS',
              payload: { position, radius, key, location, distance, value: snapshot.val() }
            })
          })
        });
    })
  }
}

export { getNearbyProducts };
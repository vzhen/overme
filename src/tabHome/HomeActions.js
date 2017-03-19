import firebase from '../app/FirebaseInit';
import GeoFire from 'geofire';

const productRef = firebase.database().ref('products');
const geoFire = new GeoFire(productRef);

const getNearbyProducts = (center, radius) => {
  return (dispatch) => {
    geoFire.query({ center, radius})
      .on("key_entered", function(key, location, distance) {
        productRef.child(key).once('value', (snapshot) => {
          dispatch({
            type: 'GETTING_NEARBY_PRODUCT',
            payload: { key, distance, value: snapshot.val() }
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
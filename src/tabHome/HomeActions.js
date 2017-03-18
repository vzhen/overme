import firebase from '../app/FirebaseInit';
import GeoFire from 'geofire';

const productRef = firebase.database().ref('products');
const geoFire = new GeoFire(productRef);

// export const geoQuery = (center, radius) => {
//   geoFire.query({
//     center: center,
//     radius: radius
//   });
// }

// geoQuery.on("key_entered", function(key, location, distance) {
//   console.log(key + " entered query at " + location + " (" + distance + " km from center)");
// });
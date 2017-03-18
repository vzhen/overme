import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../constants/configs';

firebase.initializeApp(FIREBASE_CONFIG);

export default firebase
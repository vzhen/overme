import RNImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { Platform } from 'react-native';
import uuidV4 from 'uuid/v4';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const uploadImage = (imageUri, storagePath) => {
  return new Promise((resolve, reject) => {
    let uploadBlob = null;
    const uuid = uuidV4();
    const imageRef = firebase.storage().ref(storagePath).child(uuid);
    fs.readFile(imageUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: 'images/jpeg;BASE64' })
      })
      .then((blob) => {
        uploadBlob = blob
        const uploadTask = imageRef.put(blob, { contentType: 'images/jpeg' });
        return uploadTask;
      })
      .then(() => {
        uploadBlob.close(); 
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .then((error) => {
        reject(error);
      })
  });
}
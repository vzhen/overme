import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import uuidV4 from 'uuid/v4';

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (image, storagePath) => {  
  return new Promise((resolve, reject) => {
    const uuid = uuidV4();
    const storageRef = storage.ref(storagePath).child(`${uuid}${image.fileName}`);
    let uploadBlob = null;
    let rnfbURI = RNFetchBlob.wrap(image.uri);
    Blob.build(rnfbURI, { type: image.type })
      .then((blob) => {
        uploadBlob = blob;
        return storageRef.put(blob);
      })
      .then(() => {
        uploadBlob.close();
        return storageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .then((error) => {
        reject(error);
      })
  });
}

export { uploadImage }
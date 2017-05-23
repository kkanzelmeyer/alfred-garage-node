import firebase from 'firebase';
import * as auth from './keys';
import { logger } from './config';

export function init() {
  logger.debug('initializing firebase app');
  firebase.initializeApp(auth.firebaseConfig);
}

export const garageDoorsRef = firebase.database().ref('/garage/doors');

function authenticate() {
  // connect to firebase with email/password auth
  firebase.auth()
  .signInWithEmailAndPassword(auth.email, auth.password)
  .then((user) => {
    logger.debug(`${user.email} signed in`);
    return user;
  })
  .catch((error) => {
    logger.error(error.code, error.message);
    return null;
  });
}
// const led = new five.Led('XIO-P0');

export function addGarageListener(listener) {
  garageDoorsRef.on('value', (data) => {
    logger.debug('================= garage data update ==================');
    logger.debug(data.val());
    logger.debug('=======================================================');
    listener(data);
  });
}

export default authenticate;

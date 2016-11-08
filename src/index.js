import firebase from 'firebase';
/* eslint-disable import/no-unresolved */
import five from 'johnny-five';
import chipio from 'chip-io';
/* eslint-enable */
import { logger } from './config';
import * as keys from './keys';

logger.debug('initializing firebase app');
firebase.initializeApp(keys.config);

const garageDoorsRef = firebase.database().ref('/garage/doors');
// const garageRef = firebase.database().ref('/garage/');

// init wakelight
const board = new five.Board({
  io: new chipio() // eslint-disable-line
});
board.on('ready', () => {
  // connect to firebase with email/password auth
  firebase.auth()
  .signInWithEmailAndPassword(keys.email, keys.password)
  .then((user) => {
    logger.debug(`${user.email} signed in`);

    // change handler for the alarm status
    // const led = new five.Led('XIO-P0');

    // add firebase alarm reference value listener
    garageDoorsRef.on('value', (data) => {
      logger.debug('===================================');
      logger.debug('alarm change handler');
      logger.debug(data.val());
    });
  })
  .catch((error) => {
    logger.error(error.code, error.message);
  });
});

import {
  createAction,
  handleActions,
 } from 'redux-actions';
import { fromJS } from 'immutable';
import { logger } from './config';

export const openGarage = createAction('OPEN_GARAGE');

const initialState = fromJS({

});

function openGarageHandler(state, action) {
  logger.debug(action);
  return state;
}

export default handleActions({
  [openGarage]: openGarageHandler,
}, initialState);

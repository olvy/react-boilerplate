/*
 *
 * User reducer
 *
 */

import { fromJS } from 'immutable';

import { ActionTypes } from '../constants';

const initialState = fromJS({
  data: null,
  isLoading: false,
});

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return state.set('data', null).set('isLoading', true);
    case ActionTypes.USER_LOGIN_SUCCESS:
      return state.set('data', payload).set('isLoading', false);
    case ActionTypes.USER_LOGOUT_REQUEST:
      return state.set('data', null).set('isLoading', true);
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return state.set('data', null).set('isLoading', false);
    default:
      return state;
  }
}

export default userReducer;

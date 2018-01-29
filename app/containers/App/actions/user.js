// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { ActionTypes } from '../constants';

/**
 * Login
 *
 * @returns {Object}
 */
export function login(data): Object {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: data,
  };
}

/**
 * Logout
 *
 * @returns {Object}
 */
export function logout(): Object {
  return {
    type: ActionTypes.USER_LOGOUT_REQUEST,
    payload: {},
  };
}

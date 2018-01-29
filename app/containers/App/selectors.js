/**
 * The git and user state selectors
 */

import { createSelector } from 'reselect';

const selectGit = (state) => state.get('git');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGit,
  (gitState) => gitState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGit,
  (gitState) => gitState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGit,
  (gitState) => gitState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGit,
  (gitState) => gitState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const userSelector = (state) => state.get('user');

const makeSelectData = () =>
  createSelector(userSelector, (userState) => userState.get('data'));

const makeSelectIsLoading = () =>
  createSelector(userSelector, (userState) => userState.get('isLoading'));

export {
  selectGit,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  userSelector,
  makeSelectData,
  makeSelectIsLoading,
};

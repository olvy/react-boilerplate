/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AdminComponent from 'containers/Admin';
import ProtectedComponent from 'containers/Protected';
import LoginComponent from 'containers/Login';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import styles from '../App.css';
import { logout } from './actions';
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
  userIsAdminRedir,
  userIsAuthenticated,
  userIsNotAuthenticated,
} from './auth';
import { makeSelectData, makeSelectIsLoading } from './selectors';
import gitReducer from './reducers/github';
import userReducer from './reducers/user';
import saga from './saga';

const getUserName = (user) => {
  if (user.data) {
    return `Welcome ${user.data.name}`;
  }
  return 'Not logged in';
};

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent);
const Protected = userIsAuthenticatedRedir(ProtectedComponent);
const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

// Only show login when the user is not logged in and logout when logged in
// Could have also done this with a single wrapper and `FailureComponent`
const UserName = (
  { user } // eslint-disable-line
) => <div className={styles.username}>{getUserName(user)}</div>;
const LoginLink = userIsNotAuthenticated(() => (
  <NavLink activeClassName={styles.active} to="/login">
    Login
  </NavLink>
));
const LogoutLink = userIsAuthenticated((
  { logout } // eslint-disable-line
) => (
  <a href="/" onClick={() => logout()}>
    Logout
  </a>
));

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App(param) {
  const user = param.user;
  const doLogout = param.logout;
  return (
    <Router>
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <nav className={styles.navigation}>
          <NavLink activeClassName={styles.active} exact to="/">
            Home
          </NavLink>
          <NavLink activeClassName={styles.active} exact to="/protected">
            Protected
          </NavLink>
          <NavLink activeClassName={styles.active} exact to="/admin">
            Admin
          </NavLink>
        </nav>
        <nav className={styles.authNavigation}>
          <LoginLink />
          <LogoutLink logout={doLogout} />
          <UserName user={user} />
        </nav>
        <AppWrapper>
          <Header />
          <div className={styles.content}>
            <Route exact path="/" component={HomePage} />
            <Route path="/features" component={FeaturePage} />
            <Route path="/login" component={Login} />
            <Route path="/protected" component={Protected} />
            <Route path="/admin" component={Admin} />
          </div>
          <Footer />
        </AppWrapper>
      </div>
    </Router>
  );
}

App.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = createSelector(
  makeSelectData(),
  makeSelectIsLoading(),
  (data, isLoading) => ({ user: { data, isLoading } })
);

const withConnect = connect(mapStateToProps, { logout });

const withGitReducer = injectReducer({ key: 'git', reducer: gitReducer });
const withUserReducer = injectReducer({ key: 'user', reducer: userReducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(withGitReducer, withUserReducer, withSaga, withConnect)(
  App
);

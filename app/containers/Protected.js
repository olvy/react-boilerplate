import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Protected = ({ authData }) => (
  <div >{`This is a protected page, you must be logged in if you are seeing this. Welcome ${authData &&
    authData.name}`}</div>
);
Protected.propTypes = {
  authData: PropTypes.object,
};
export default connect((state) => ({ authData: state.get('user').get('data') }))(
  Protected
);

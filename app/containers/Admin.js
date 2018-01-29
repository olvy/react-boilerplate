import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Admin = ({ authData }) => (
  <div>{`Welcome admin user: ${
    authData.name
  }. You must be logged in as an admin if you are seeing this page.`}</div>
);

Admin.propTypes = {
  authData: PropTypes.object,
};

export default connect((state) => ({ authData: state.get('user').get('data') }))(
  Admin
);

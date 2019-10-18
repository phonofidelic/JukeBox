import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authActions, errorActions } from '../actions';
// import { getRedirectReferrer } from '../selectors';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import ErrorMessageContainer from './ErrorMessageContainer';
// import posed from 'react-pose';
// import { Button, Typography } from '@material-ui/core';

const actions = {
  ...authActions,
  ...errorActions
};

class AuthContainer extends Component {
  render() {
    const { auth } = this.props;

    return (
      <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <ErrorMessageContainer />
        {auth.loading ? <Loader /> : <Auth {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
    // from: getRedirectReferrer(state)
  };
};

export default connect(
  mapStateToProps,
  actions
)(AuthContainer);

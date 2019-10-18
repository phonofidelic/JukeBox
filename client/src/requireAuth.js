import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      // console.log('====================================');
      // console.log('this.props.auth.isAuthed:', this.props.auth.isAuthed);
      // console.log('====================================');
      setTimeout(() => {
        // if (!this.props.auth.isAuthed) {
        if (!localStorage.getItem('token')) {
          // this.props.history.push('/');
          this.props.logoutUser();
        }
      }, 1000);
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(
    mapStateToProps,
    authActions
  )(ComposedComponent);
};

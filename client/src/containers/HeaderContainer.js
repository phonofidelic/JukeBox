import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';

class HeaderContainer extends Component {
  render() {
    const { location, userAgentIsMobile } = this.props;
    console.log('====================================');
    console.log('HeaderContainer, location:', location.pathname);
    console.log('====================================');
    return true ? (
      <HeaderMobile pathname={location.pathname} />
    ) : (
      <HeaderDesktop pathname={location.pathname} />
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.router.location,
    userAgentIsMobile: state.auth.userAgentIsMobile
  };
};

export default connect(
  mapStateToProps,
  null
)(HeaderContainer);

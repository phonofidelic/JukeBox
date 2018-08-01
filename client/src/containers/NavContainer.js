import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import NavMobile from '../components/NavMobile';
import NavDesktop from '../components/NavDesktop';


class NavContainer extends Component {
	constructor(props) {
		super(props);
    this.props.checkUserAgent();
	}
	handleSignOut() {
		console.log('handleSignOut, this.props:', this.props)
		const confirm = window.confirm('Are you sure you want to sign out?');
		if (confirm === true) {
			return this.props.logoutUser();
		}
    return;
	}

	render() {
		const { userAgentIsMobile, location } = this.props;

		return userAgentIsMobile ? <NavMobile location={location} handleSignOut={this.handleSignOut.bind(this)} /> : <NavDesktop location={location} handleSignOut={this.handleSignOut.bind(this)} />
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		userAgentIsMobile: state.auth.userAgentIsMobile,
		location: state.router.location,
	}
}

export default connect(mapStateToProps, authActions)(NavContainer);

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
		const { 
			userAgentIsMobile, 
			locationPathname 
		} = this.props;

		return userAgentIsMobile ? 
			<NavMobile 
				locationPathname={locationPathname} 
				handleSignOut={this.handleSignOut.bind(this)} 
			/> 
			: 
			<NavDesktop 
				locationPathname={locationPathname} 
				handleSignOut={this.handleSignOut.bind(this)} 
			/>
	}
}

const mapStateToProps = state => {
	return {
		userAgentIsMobile: state.auth.userAgentIsMobile,
		locationPathname: state.router.location.pathname,
	}
}

export default connect(mapStateToProps, authActions)(NavContainer);

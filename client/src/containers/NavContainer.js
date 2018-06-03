import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import Nav from '../components/Nav';

class NavContainer extends Component {
	handleSignOut() {
		console.log('handleSignOut, this.props:', this.props)
		const confirm = window.confirm('Are you sure you want to sign out?');
		if (confirm === true) {
			return this.props.logoutUser();
		}
    return;
	}

	render() {
		return (<Nav handleSignOut={this.handleSignOut.bind(this)} />)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps, authActions)(NavContainer);

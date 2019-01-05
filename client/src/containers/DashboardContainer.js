import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import Dashboard from '../components/Dashboard';
import Loader from '../components/Loader';

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getUserInfo();
	}

	handleSignOut = () => {
		const confirm = window.confirm('Are you sure you want to sign out?');
		if (confirm === true) {
			return this.props.logoutUser();
		}
    return;
	}

	handleGDriveConnect = () => {
		this.props.connectGDriveAccount()
	}

	render() {
		const { auth } = this.props;
		return (
			<div>
				{ 
					auth.loading ?
					<Loader />
					:
					<Dashboard 
						user={auth.user} 
						handleSignOut={this.handleSignOut}
						handleGDriveConnect={this.handleGDriveConnect}
					/>	
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, authActions)(DashboardContainer);
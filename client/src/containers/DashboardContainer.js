import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import Loader from '../components/Loader';

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getUserInfo();
	}

	render() {
		const { auth } = this.props;
		return (
			<div>
				{ 
					auth.loading ?
					<Loader />
					:
					<div>
						email: { auth.user && auth.user.email }
					</div>	
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
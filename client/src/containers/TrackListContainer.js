import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/trackListActions';
import TrackList from '../components/TrackList';

class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();
	}	

	render() {
		const { tracks, error } = this.props.trackList;
		return(
			!error ? 
			<TrackList tracks={tracks} /> 
			: 
			<div>There was an error: {error.message}</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		trackList: state.trackList
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);
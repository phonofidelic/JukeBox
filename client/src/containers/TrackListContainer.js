import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trackListActions, playerActions } from '../actions';
import TrackList from '../components/TrackList';

const actions = { ...trackListActions, ...playerActions };

export class TrackListContainer extends Component {
	constructor(props) {
		super(props);
		this.props.getTracks();
	}

	componentDidCatch(error, info) {
    console.log('componentDidCatch, error', error)
  }

	render() {
		const { trackList } = this.props;

		return(
			<TrackList 
				trackList={trackList}
			/> 
		)
	}
}

const mapStateToProps = state => {
	return {
		trackList: state.trackList
	}
}

export default connect(mapStateToProps, actions)(TrackListContainer);
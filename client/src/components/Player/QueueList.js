import React, { Component } from 'react';
import styled from 'styled-components';

import {
	ThemeContext,
	getColorPrimaryMain,
	// getColorPrimaryLight,
	getSecondaryBackgroundColor,
	getPlayerHeight,
	getPlayerProgressOpenHeight,
} from '../../contexts/theme.context';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const WINDOW_HEIGHT = window.innerHeight;

const Container = styled.div`
	background-color: ${getSecondaryBackgroundColor};
	// position: absolute;
	position: fixed;
	width: inherit;
	// height: ${getPlayerHeight}px;
	// height: 100%;
	// top: ${getPlayerHeight}px;
	top: 0; // needed with flip animation
	bottom: -${(props) => WINDOW_HEIGHT - (getPlayerProgressOpenHeight(props) + (getPlayerHeight(props) * 2))}px;
	overflow-y: auto;
	padding: 0;
`

class QueueList extends Component {
	static contextType = ThemeContext;
	constructor(props) {

		super(props);
		this.handleQueueItemClick = this.handleQueueItemClick.bind(this)
	}

	handleQueueItemClick(newQueueIndex, track) {
		this.props.handlePlayFromQueue(this.props.queue, this.props.queueIndex, newQueueIndex, track);
	}

	handleTouchStart = e => {
		e.stopPropagation();
		console.log('QueueList, handleTouchStart, e:', e)
	}

	handleTouchEnd = e => {
		e.stopPropagation();
		console.log('QueueList, handleTouchEnd, e:', e)
	}

	render() {
		const { 
			queue, 
			currentTrack,
		} = this.props;

		const theme = this.context;

		return (
			<Container theme={theme}>
				<List 
					theme={theme}
					style={{height: '100%', padding: 0}}
					onTouchStart={this.handleTouchStart}
					onTouchEnd={this.handleTouchEnd}
				>
					{
						queue.map((track, i) => (
							<ListItem 
								theme={theme}
								style={{ backgroundColor: currentTrack.queueId === track.queueId ? 
									getColorPrimaryMain({theme})
									:
									getSecondaryBackgroundColor({theme})
								}}
								key={ track.queueId }
								divider={ currentTrack.queueId !== track.queueId ? true : false }
								dense={true}
								onClick={() => this.handleQueueItemClick(i, track)}
							>
								<div>
									<Typography noWrap>{i+1}. { track.title }</Typography>
									{ 
										currentTrack.queueId === track.queueId ?
										<div>
											<Typography noWrap variant="caption">{ track.artist.name }</Typography>
											<Typography noWrap variant="caption">{ track.album.title }</Typography>
										</div>
										:
										null
									}
								</div>
							</ListItem>
						))
					}
				</List>
			</Container>
		);
	}
}

export default QueueList;

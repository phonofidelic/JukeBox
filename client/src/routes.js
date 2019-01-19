import React from 'react';
import { Route } from 'react-router';
import App from './App';
import { 
	TrackListView, 
	UploaderView,
	NotFound, 
} from './views';

const TempLandingPage = () => {
	return (
		<div>
			<h1>Temp Landing Page</h1>
		</div>
	);
}

export default (
	<Route path="/" conponent={App}>
		<Route path="/tracks" component={TrackListView} />
		<Route path="/uploader" component={UploaderView} />
		<Route path="*" component={NotFound} />
	</Route>
);
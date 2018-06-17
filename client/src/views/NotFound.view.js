import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// TODO: Add back button that redirects to referrer 
const NotFound = () => {
	return (
		<div>
			<Typography variant="display1">Not Found</Typography>
			<p>Sorry, the page you requested could not be found</p>
		</div>
	);
};

export default NotFound;
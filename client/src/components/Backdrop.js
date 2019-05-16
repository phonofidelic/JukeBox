import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = props => {
	const { 
		open,
		onBackdropClick,
	} = props;

	const styles = {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100vw',
		height: open ? '100%': 0,
		backgroundColor: open ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)', 
		transition: `all .5s ease 0s`
	}
	return (
		<div 
			style={styles} 
			onClick={() => onBackdropClick()}
		/>
	);
}

Backdrop.propTypes = {
	open: PropTypes.bool.isRequired,
	onBackdropClick: PropTypes.func.isRequired,
}

export default Backdrop;
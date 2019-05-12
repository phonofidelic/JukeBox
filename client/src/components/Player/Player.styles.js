const styles = theme => ({
	root: {
	  position: 'fixed',
	  bottom: 0,
	  width: '100%',
	  zIndex: 1,
	},
	containerMobile: {
		backgroundColor: theme.palette.secondary.light,
		width: '100%',
		// height: theme.dimensions.player.height + 10,
		margin: '0 auto',
		boxShadow: '0px -1px 20px 1px #ccc',
	  padding: '0',
	},
	containerDesktop: {
		backgroundColor: theme.palette.secondary.light,
		maxWidth: theme.dimensions.libraryDesktop.maxWidth,
		margin: '0 auto',
		boxShadow: '0px -1px 20px 1px #ccc',
	  borderBottom: `solid 1px ${theme.palette.primary.main}`,
	  padding: '0',
	  zIndex: 3,
	},
});

export default styles;


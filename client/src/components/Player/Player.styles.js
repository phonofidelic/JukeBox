const styles = theme => ({
	root: {
	  position: 'fixed',
	  bottom: 0,
	  width: '100%',
	},
	containerMobile: {
		width: '100w',
		// maxWidth: theme.dimensions.libraryDesktop.maxWidth,
		margin: '0 auto',
		boxShadow: '0px -1px 20px 1px #ccc',
	  backgroundColor: theme.palette.secondary.light,
	  // borderBottom: `solid 1px ${theme.palette.primary.main}`,
	  padding: '0',
	  zIndex: 3,
	},
	containerDesktop: {
		width: theme.dimensions.player.width,
		maxWidth: theme.dimensions.libraryDesktop.maxWidth,
		margin: '0 auto',
		boxShadow: '0px -1px 20px 1px #ccc',
	  backgroundColor: theme.palette.secondary.light,
	  borderBottom: `solid 1px ${theme.palette.primary.main}`,
	  padding: '0',
	  zIndex: 3,
	},
});

export default styles;


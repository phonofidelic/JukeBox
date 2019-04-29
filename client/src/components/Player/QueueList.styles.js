const styles = theme => ({
	root: {
		background: theme.palette.secondary.light,
		position: 'fixed',
		width: 'inherit',
		top: theme.dimensions.player.height,
		bottom: 0,
		overflowY: 'auto',
		padding: 0,
	},
	playing: {
		background: theme.palette.primary.main,
	},
});

export default styles;


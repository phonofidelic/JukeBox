const styles = theme => ({
	root: {
		background: theme.palette.primary.light,
		border: 'solid 1px #e0e0e0',
		position: 'absolute',
		width: 'inherit',
		overflowY: 'auto',
		padding: 0,
	},
	playing: {
		background: theme.palette.primary.main,
	},
});

export default styles;

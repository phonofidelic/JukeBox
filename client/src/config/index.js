export const URLS = {
	TRACK_URL: '/tracks',
  ARTIST_URL: '/library/artists',
  ALBUM_URL: '/library/albums'
}

export const THEME = {
	typography: {
    // Use the system font over Roboto.
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500,
    },
    subheading: {
      fontSize: 12,
    },
    button: {
      // fontStyle: 'italic',
      // size: 'large'
    },
  },
  palette: {
    primary: {
      main: '#d2d8d8',
      light: '#fff',
      dark: '#222'
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d'
    },
    context: {
      danger: '#EF5350',
      warning: 'orange',
      success: 'green',
      info: 'blue'
    }
  },
  dimensions: {
    libraryDesktop: {
      titleCellWidth: '300px',
      durrationCellWidth: '100px',
      artistCellWidth: '100px',
      albumCellWidth: '100px',
    },
    nav: {
      navHeight: '56px',
    }
  },
}
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
      main: '#d2d8d8', // accent
      light: '#fff', // background
      dark: '#222'
    },
    secondary: {
      main: '#fbaaac', // accent
      light: '#fafafa', // background
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
      titleCellWidth: 300,
      durrationCellWidth: 100,
      artistCellWidth: 100,
      albumCellWidth: 100,
    },
    nav: {
      navHeight: 56,
    },
    navDesktop: {
      navWidth: 80,
    },
    player: {
      playerHeight: 58,
    }
  },
}
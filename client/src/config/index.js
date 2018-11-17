import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

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
      dark: '#222',
      hover: '#ededed',
      selected: '#dbdbdb',
    },
    secondary: {
      main: '#e91e00', // accent
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
    },
    nav: {
      navHeight: 56,
    },
    navDesktop: {
      navWidth: 80,
      marginTop: 58,
      zIndex: 3,
    },
    navMobile: {
      height: 56,
      zIndex: 3,
    },
    player: {
      height: 58,
    }
  },
}
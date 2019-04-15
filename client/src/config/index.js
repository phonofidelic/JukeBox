import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

const API_ROOT = process.env.NODE_ENV === 'production' ? 
  'http://ec2-35-164-241-235.us-west-2.compute.amazonaws.com'
  :
  '';

export const URLS = {
  LIBRARY_URL: `${API_ROOT}/api/library`,
	TRACK_URL: `${API_ROOT}/api/tracks`,
  ARTIST_URL: `${API_ROOT}/api/library/artists`,
  ALBUM_URL: `${API_ROOT}/api/library/albums`,
  STREAM_URL: `${API_ROOT}/api/stream`,
  AUTH_URL: `${API_ROOT}/api/auth`,
  GDRIVE_URL: `${API_ROOT}/api/gdrive`,
}

export const THEME = {
	typography: {
    useNextVariants: true,
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
      maxWidth: 900,
    },
    libraryControls: {
      height: 32,
    },
    nav: {
      navHeight: 56,
    },
    navDesktop: {
      navWidth: 80, // TODO: Find usage of this and change to 'width'
      width: 80,
      marginTop: 58,
      zIndex: 3,
    },
    navMobile: {
      height: 56,
      zIndex: 3,
    },
    topNav: {
      height: 30,
    },
    player: {
      width: 900,
      height: 58,
    },
    playerProgress: {
      height: 10,
    }
  },
}
import React from 'react';

export const theme = {
  typography: {
    useNextVariants: true,
    // Use the system font over Roboto.
    fontFamily: ['Roboto', 'sans-serif'],
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500
    },
    subheading: {
      fontSize: 12
    },
    button: {
      // fontStyle: 'italic',
      // size: 'large'
    }
  },
  palette: {
    primary: {
      main: '#d2d8d8', // accent
      light: '#fff', // background
      dark: '#222',
      hover: '#ededed',
      selected: '#dbdbdb',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, .3)'
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
      maxWidth: 900
    },
    libraryControls: {
      height: 32
    },
    nav: {
      height: 56,
      zIndex: 3
    },
    navDesktop: {
      navWidth: 80, // TODO: Find usage of this and change to 'width'
      width: 80,
      marginTop: 58
      // zIndex: 3,
    },
    navMobile: {
      height: 56,
      // height: 0,
      zIndex: 3
    },
    player: {
      width: 900,
      // height: 62,
      height: 56
    },
    playerProgress: {
      height: 10
    },
    playerProgressOpen: {
      height: 48
    }
  }
};

export const getColorPrimaryMain = props => props.theme.palette.primary.main;
export const getColorPrimaryDark = props => props.theme.palette.primary.dark;
export const getColorPrimaryLight = props => props.theme.palette.primary.light;
export const getPrimaryHover = props => props.theme.palette.primary.hover;
export const getPrimarySelected = props => props.theme.palette.primary.selected;
export const getSecondaryBackgroundColor = props =>
  props.theme.palette.secondary.light;
export const getNavMobileHeight = props =>
  props.theme.dimensions.navMobile.height;
export const getNavMobileZIndex = props =>
  props.theme.dimensions.navMobile.zIndex;
export const getPlayerHeight = props => props.theme.dimensions.player.height;
export const getPlayerWidth = props => props.theme.dimensions.player.width;
export const getPlayerProgressOpenHeight = props =>
  props.theme.dimensions.playerProgressOpen.height;
export const getLibraryDesktopMaxWidth = props =>
  props.theme.dimensions.libraryDesktop.maxWidth;

export const ThemeContext = React.createContext(theme);

export class ThemeProvider extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <ThemeContext.Provider value={theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

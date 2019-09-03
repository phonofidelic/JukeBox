import React, { Component } from 'react';

import {
  ThemeContext,
  getSecondaryBackgroundColor
} from '../../contexts/theme.context';

import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    // width: 300
    height: '10px'
  },
  slider: {
    // padding: '22px 0px'
    // padding: '22px 0px'
  },
  track: {
    backgroundColor: '#e62118'
    // height: '5px'
  },
  thumb: {
    backgroundColor: '#e62118'
  },
  activated: {
    width: '22px',
    height: '22px'
  }
};

class PlayerProgress extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    window.addEventListener('howl_play', e => {
      // console.log('howl_play event', e);
      this.startTimer();
    });

    window.addEventListener('howl_pause', e => {
      // console.log('howl_pause event', e);
      clearInterval(this.intervalID);
    });

    window.addEventListener('howl_end', e => {
      // console.log('howl_end event', e);
      clearInterval(this.intervalID);
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  startTimer() {
    const { player } = this.props;
    if (this.intervalID) clearInterval(this.intervalID);

    this.intervalID = setInterval(() => {
      this.setState({
        value:
          ((player.currentTrack.howl.seek() || 0) /
            (player.currentTrack.format.duration ||
              player.currentTrack.howl.duration())) *
          100
      });
    }, 100);
  }

  getSegments() {
    const { player } = this.props;
    let segments = [];

    if (player.currentTrack) {
      for (
        let i = 0;
        i < Math.round(player.currentTrack.format.duration);
        i++
      ) {
        segments.push(i);
      }
    }
    return segments;
  }

  handleChange = (e, value) => {
    e.stopPropagation();
    console.log('value:', value);
    const { player, handleSeek } = this.props;

    // Convert 'value' (percentage) to time position
    const pos = player.currentTrack.format.duration * (value / 100);
    handleSeek(pos, player.currentTrack);
    this.setState({ value });
    this.startTimer();
  };

  render() {
    const { player, playerIsOpen, userAgentIsMobile, classes } = this.props;

    const { value } = this.state;

    const theme = this.context;

    const styles = {
      root: {
        // width: 300
      },
      slider: {
        // padding: '22px 0px'
        // padding: '22px 0px'
      },
      track: {
        backgroundColor: '#e62118'
      },
      thumb: {
        backgroundColor: '#e62118'
      },
      activated: {
        width: '22px',
        height: '22px'
      }
    };

    return (
      <Slider
        classes={{
          root: classes.root,
          container: classes.slider,
          track: classes.track,
          thumb: classes.thumb
          // activated: classes.activated,
        }}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

export default withStyles(styles)(PlayerProgress);

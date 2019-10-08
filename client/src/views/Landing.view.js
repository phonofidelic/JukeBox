import React from 'react';
import AuthContainer from '../containers/AuthContainer';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MusicNote from '@material-ui/icons/MusicNote';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Cloud from '@material-ui/icons/CloudQueue';
import styled from 'styled-components';

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // height: 100vh;
`;

const Header = styled.div`
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-araound;
`;

const Intro = styled.div`
  padding: 2em;
`;

const LandingView = props => {
  return (
    <Container>
      <Header>
        <Typography
          variant="h1"
          style={{ marginTop: '1em', marginBottom: '.5em' }}
        >
          jukebox
        </Typography>
        <div
          style={{
            margin: '0 auto',
            marginBottom: '2.5em',
            display: 'flex',
            justifyContent: 'space-between',
            width: 300
          }}
        >
          <MusicNote />
          <ArrowForward />
          <Cloud />
        </div>
        <Intro>
          <Typography>
            A web app that lets you store and play your audio files in the
            cloud.
          </Typography>
        </Intro>
      </Header>
      <AuthContainer />
    </Container>
  );
};

export default withTheme(LandingView);

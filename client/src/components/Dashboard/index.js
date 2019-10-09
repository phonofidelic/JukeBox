import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/theme.context';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccountInfo from './AccountInfo';

const Container = styled.div`
  margin-top: 56px;
  padding-left: ${({ theme, isMobile }) =>
    isMobile ? 0 : theme.dimensions.navDesktop.width}px;
`;

const ButtonContainer = styled.div`
  margin: 10px;
  margin-top: 50px;
`;

const Dashboard = props => {
  const theme = useContext(ThemeContext);
  const { user, isMobile, handleSignOut, handleGDriveConnect } = props;

  return (
    <Container theme={theme} isMobile={isMobile}>
      {user && <AccountInfo user={user} />}
      <ButtonContainer>
        <Button variant="outlined" onClick={() => handleSignOut()}>
          Sign out
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Dashboard;

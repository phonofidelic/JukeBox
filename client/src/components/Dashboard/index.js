import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/theme.context';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccountInfo from './AccountInfo';

const Container = styled.div`
  margin-top: 56px;
  // padding-top: 25%;
  padding-left: ${({ theme, isMobile }) =>
    isMobile ? 0 : theme.dimensions.navDesktop.width}px;
`;

const UserInfo = styled.div`
  text-align: left;
  width: 500px;
  margin: auto;
`;

const UserInfoItem = styled.div`
  margin: 2em;
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
      <div>
        <Typography variant="h4">User info</Typography>
      </div>
      {user && <AccountInfo user={user} />}
      {/* <UserInfo>
        <UserInfoItem>
          <Typography>Email: {user && user.email}</Typography>
        </UserInfoItem>
        <UserInfoItem>
          <Typography>
            Storage usage: {user && user.storageUsage / 1000000} MB
          </Typography>
        </UserInfoItem>
      </UserInfo> */}
      {/* <ButtonContainer>
        <Button variant="outlined" onClick={() => handleGDriveConnect()}>
          Connect Google Drive
        </Button>
      </ButtonContainer> */}
      <ButtonContainer>
        <Button variant="outlined" onClick={() => handleSignOut()}>
          Sign out
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Dashboard;

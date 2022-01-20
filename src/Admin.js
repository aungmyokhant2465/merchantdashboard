import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { setToken, setUser } from './services/login';

import Profile from './views/Profile';
import CreateQR from './views/QRCodes/Create';
import QRCodes from './views/QRCodes/Index';
import Transcations from './views/Transcations';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './layout/Header';
import SideBar from './layout/SideBar';

const drawerWidth = 340;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Admin = () => {
  const [open, setOpen] = useState(false);

  const history = useHistory()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    const loggedAuthorJSON = window.localStorage.getItem('loggedMerchant')
    if(loggedAuthorJSON) {
      const result = JSON.parse(loggedAuthorJSON)
      setToken(result.token)
      setUser({ username: result.username, id: result.id })
    } else {
      history.push('/login')
    }
  }, [history])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      <Main open={open}>
        <DrawerHeader />
        <Switch>
          <Route path="/profile" key="/profile">
            <Profile />
          </Route>
          <Route exact path="/" key="/">
            <Profile />
          </Route>
          <Route path="/QRCodes/create" key="/QRCodes/create">
            <CreateQR />
          </Route>
          <Route path="/QRCodes/list" key="/QRCodes/list">
            <QRCodes />
          </Route>
          <Route path="/transcations" key="/transcations">
            <Transcations />
          </Route>
        </Switch>
      </Main>
    </Box>
  );
}

export default Admin

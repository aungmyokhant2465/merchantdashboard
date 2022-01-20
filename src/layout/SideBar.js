import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { QrCode2, SummarizeSharp } from '@mui/icons-material';

const drawerWidth = 340;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideBar = ({ handleDrawerClose, open }) => {

    const theme = useTheme();

    return (
    <Drawer
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
        }}
        variant="persistent"
        anchor="left"
        open={open}
    >
        <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <Link to="/QRCodes/create">
                <ListItem button>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    Create QR
                </ListItem>
            </Link>
            <Divider />
            <Link to="/QRCodes/list">
                <ListItem button>
                    <ListItemIcon>
                        <QrCode2 />
                    </ListItemIcon>
                    QR Codes
                </ListItem>
            </Link>
            <Divider />
            <Link to="/transcations">
                <ListItem button>
                    <ListItemIcon>
                        <SummarizeSharp />
                    </ListItemIcon>
                    Transcations
                </ListItem>
            </Link>
        </List>
    </Drawer>
    )
}

export default SideBar
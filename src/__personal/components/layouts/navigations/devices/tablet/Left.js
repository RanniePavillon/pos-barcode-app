import { useState, useRef } from 'react';
import { Badge, Box, SwipeableDrawer, AppBar, Toolbar, List, IconButton, ListItem, ListItemIcon, ListItemText, MenuItem, Menu } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HomeRounded as IHome, ChevronRight as IChevronRight, ChevronLeft as IChevronLeft, Notifications as INotifications, AccountCircle as IAccountCircle } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 260;


const Left = () => {
    const inputEl = useRef(0);
    const [open] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [leftOpen, setLeftOpen] = useState(false);
	const [ael, setAel] = useState(null);
    let location = useLocation().pathname.split('/')
    
    const useStyles = makeStyles((theme) => ({
        appbar: {
            top: '48px',
            marginLeft: drawerWidth,
            width: open?`calc(100% - ${drawerWidth}px)`:'',
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration[open?'leavingScreen':'enteringScreen'],
            }),
        },
        drawerToggle: {
            width: drawerWidth
        },
        ListItemText: {
            '& span, & svg': {
                fontSize: '13px'
            },
        },
        active: {
            backgroundColor: '#007c74',
            color: '#ffffff',
            '&:hover': {
                color: '#ffffff',
                backgroundColor: '#007c74',
            },
        }
    }));
    const classes = useStyles();

    const menuToggler = (e, action) => {
        if (action === 'open') {
            setAel(e.currentTarget);
            setMenuOpen(true)
        } else {
            setAel(null);
            setMenuOpen(false)
        }
    }

    const leftToggler = (e, action) => {
        (action==='open'?setLeftOpen(true):setLeftOpen(false));
    }

    return (
        <Box>
            <AppBar position="fixed" className={classes.appbar} style={{backgroundColor: 'white'}} elevation={5}>
                <Toolbar variant="dense">
                    <Box onClick={(e)=>leftToggler(e, 'open')}>
                        <IChevronRight style={{color: 'grey'}} />
                    </Box>
                    <Box flexGrow={1} />
                    <Box display="flex">
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary"><INotifications style={{color: '#404040'}} /></Badge>
                        </IconButton>
                        <IconButton edge="end" ref={inputEl} aria-controls="aelDesk" aria-label="account of current user" aria-haspopup="true" color="inherit" onClick={(e)=>menuToggler(e, 'open')}>
                            <IAccountCircle style={{color: '#404040'}} />
                        </IconButton>
                        <Menu anchorEl={ael} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id="aelDesk"
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={menuOpen} onClose={(e)=>menuToggler(e, '!open')} keepMounted
                        >
                            <MenuItem onClick={menuToggler}>Profile</MenuItem>
                            <MenuItem onClick={menuToggler}>My account</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="left" open={leftOpen} onClose={(e)=>leftToggler(e, '!open')} onOpen={(e)=>leftToggler(e, 'open')}>
                <Box className={classes.drawerToggle}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box ml={2.1} className="f-18"><strong>Menu</strong></Box>
                        <Box display="flex" alignItems="center" pl={1}>
                            <IconButton onClick={(e)=>leftToggler(e, '!open')}>
                                <IChevronLeft />
                            </IconButton>
                        </Box>
                    </Box>
                    <List>
                        <Link to="/">
                            <ListItem button className={location[1]===''?classes.active:''}>
                                <ListItemIcon style={{marginLeft: !open ? '5px' : '', minWidth: open ? '40px' : '50px'}}><IHome /></ListItemIcon>
                                <ListItemText className={classes.ListItemText} primary="Home" />
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </SwipeableDrawer>
        </Box>
    );
}

export default Left;
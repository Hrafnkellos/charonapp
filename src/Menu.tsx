import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Component } from 'react';
import * as React from 'react';
import { Link } from "react-router-dom";
import { NestedList} from './Tiles';

const styles = {
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  root: {
    flexGrow: 1,
  },
};

class MenuAppBar extends Component<IMenuAppBar,any> {
  public state = {
    anchorEl: null,
    auth: true,
    sidebarOpen: false
  };

  public handleChange = (event:any) => {
    this.setState({ auth: event.target.checked });
  };

  public handleMenu = (event:any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorEl: null });
  };


  public handleLogin = () => {
    fetch('https://us-central1-charon-lb.cloudfunctions.net/api/login')
      .then(response => response.json())
      .then(jsonResponse => alert(JSON.stringify(jsonResponse)));
  };

  public toggleDrawer = (side:any, open:any) => () => {
    this.setState({
      [side]: open,
    });
  };

  public render() {
    const { classes, history } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
      <div className={classes.list}>
        <NestedList classes={classes} history={history}/>
      </div>
    );

    return (
      <div className={classes.root}>
        <SwipeableDrawer
          open={this.state.sidebarOpen}
          onClose={this.toggleDrawer('sidebarOpen', false)}
          onOpen={this.toggleDrawer('sidebarOpen', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('sidebarOpen', false)}
            onKeyDown={this.toggleDrawer('sidebarOpen', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} onClick={this.toggleDrawer('sidebarOpen', true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              <Link to="/" style={{textDecoration: 'none', color: 'white'}}>Charon</Link>  <span style={{fontSize:20, textTransform: 'capitalize'}}>{history.location.pathname.replace("/","")}</span>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-haspopup="true"
                  aria-owns={open ? 'menu-appbar' : undefined}
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleLogin}>login</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

interface IMenuAppBar {
    classes: any,
    history: any,
}

export default withStyles(styles)(MenuAppBar);

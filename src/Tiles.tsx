import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import * as React from 'react';

const styles = (theme:any) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: '100%',
  },
});

withStyles(styles);
export class NestedList extends React.Component<INestedList, any> {

  public state = {
    open: true,
  };

  // public handleClick = () => {
  //   alert('lol');
  //   this.props.history.push("/accounts")
  // };

  public handleClick = (path:string) => () => {
    this.props.history.push(path);
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Accounts</ListSubheader>}
        >
          <ListItem button={true} onClick={this.handleClick("/accounts")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Account Overview" />
          </ListItem>
        </List>
        <Divider />
        <List
          component="nav"
          subheader={<ListSubheader component="div">Payments</ListSubheader>}
        >
          <ListItem button={true} onClick={this.handleClick("/payments")}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Perform Payment" />
            </ListItem>
        </List>
      </div>
    );
  }
}

interface INestedList {
  classes:any,
  history: any,
};

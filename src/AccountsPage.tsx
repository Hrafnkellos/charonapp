import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Component } from 'react';
import { Account } from '../functions/src/api/Interfaces/Account';
import { AccountListItem } from './AccountListItem';

const styles = (theme:any) => ({
  root: {
    width: '100%',
  },
});

class Accounts extends Component<IAccounts,ISAccounts> {

  constructor(props:any) {
    super(props);
    this.state = { accounts: [] };
    fetch('http://localhost:5000/charon-lb/us-central1/api/accounts') // 'https://us-central1-charon-lb.cloudfunctions.net/api/accounts')
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          accounts: jsonResponse.accounts
        });
      });
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <Grid container={true} spacing={24}>
            {this.state.accounts.map((account:Account) =>
              <Grid item={true} xs={12}  key={account._id}>
                <AccountListItem account={account}/>
              </Grid>
            )}
          </Grid>
        </List>
      </div>
    )
  }
}

interface IAccounts {
  classes:any
};

interface ISAccounts {
  accounts:Account[];
}

export default withStyles(styles)(Accounts);

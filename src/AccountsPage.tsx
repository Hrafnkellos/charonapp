import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Component } from 'react';
import { Account } from '../functions/src/api/Interfaces/Account';
import { AccountDetail } from './AccountDetail';
import { AccountListItem } from './AccountListItem';

const styles = (theme:any) => ({
  root: {
    width: '100%',
  },
});

class Accounts extends Component<IAccounts,ISAccounts> {

  constructor(props:any) {
    super(props);
    this.state = { accounts: [], selectedAccount: 0 };
    fetch('http://localhost:5000/charon-lb/us-central1/api/accounts') // 'https://us-central1-charon-lb.cloudfunctions.net/api/accounts')
    .then(response => response.json())
    .then(jsonResponse => {
      this.setState({
        accounts: jsonResponse.accounts
      });
    });
  };

  public SelectAccount = (selectedAccount:number)  => {
    this.setState({
      selectedAccount,
    });
  };

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <Grid container={true} spacing={24}>
            <Grid item={true} container={true} xs={4} spacing={24}>
              {this.state.accounts.map((account:Account, index:number) =>
                <Grid item={true} xs={12}  key={account._id}>
                  <AccountListItem account={account} index={index} select={this.SelectAccount}/>
                </Grid>
              )}
            </Grid>
            <Grid item={true} container={true} xs={8} spacing={24}>
              <Grid item={true} xs={12}>
                { this.state.accounts.length > 0 && <AccountDetail account={this.state.accounts[this.state.selectedAccount]}/> }
              </Grid>
            </Grid>
          </Grid>
        </List>
      </div>
    )
  }
}

interface IAccounts {
  classes:any;
};

interface ISAccounts {
  accounts:Account[];
  selectedAccount:number;
}

export default withStyles(styles)(Accounts);

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Component } from 'react';
import { Account } from '../functions/src/api/Interfaces/Account';

export class AccountDetail extends Component<IAccountDetail ,any> {
  public render() {
    const {  account } = this.props;

    return (
      <Paper elevation={1} style={{padding: 20}}>
        <Typography variant="headline" component="h3">
          {account._id}
        </Typography>
        <Typography component="p">
          Available Balance: {account.availableBalance}
        </Typography>
        <Typography component="p">
          Status: {account.status}
        </Typography>
        <Typography component="p">
          Bank: {account.bank.name}
        </Typography>
      </Paper>
    );
  }
}

interface IAccountDetail {
  account: Account,
};

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Component } from 'react';
import { Account } from '../functions/src/api/Interfaces/Account';
import { ITransaction } from './AccountsPage';
import { TransactionList } from './TransactionList';

export class AccountDetail extends Component<IAccountDetail, any> {

  constructor(props:any) {
    super(props);
  }

  public render() {
    const {  account, transactions } = this.props;

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
        <Typography component="h4">
          Transactions
        </Typography>
        <TransactionList transactions={transactions}/>
      </Paper>
    );
  }
}

interface IAccountDetail {
  account: Account,
  transactions: ITransaction[],
};

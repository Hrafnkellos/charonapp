import Paper from '@material-ui/core/Paper';
// import { StyleRulesCallback, Theme, withStyles  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { Component } from 'react';
import { ITransaction } from './AccountsPage';


export interface ITransactionListProps {
  transactions: ITransaction[];
}

 const classes = {
  root: {
    marginTop: 20,
    // overflowX: 'auto',
    width: '100%',
  },
  table: {
    minWidth: 500,
  },
};

export class TransactionList extends Component<ITransactionListProps,any> {

  public render() {
    const { transactions } = this.props;

    return (
      <Paper style={classes.root}>
        <Table style={classes.table} padding={'dense'}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell numeric={true}>Amount</TableCell>
              <TableCell numeric={true}>Currency</TableCell>
              <TableCell numeric={true}>BookingDate</TableCell>
              <TableCell >Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => {
              return (
                <TableRow key={transaction.transactionId}>
                  <TableCell component="th" scope="row" >
                    {transaction.transactionId}
                  </TableCell>
                  <TableCell numeric={true}>{transaction.amount}</TableCell>
                  <TableCell numeric={true}>{transaction.currency}</TableCell>
                  <TableCell numeric={true}>{transaction.bookingDate}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

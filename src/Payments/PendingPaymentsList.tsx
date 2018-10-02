import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { Component } from 'react';
import { PendingPayment } from '../../functions/src/api/Interfaces/PendingPayment';

export interface IPendingPaymentsListProps {
  PendingPayments: PendingPayment[];
  ConfirmPayment: any,
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

export class PendingPaymentsList extends Component<IPendingPaymentsListProps,any> {

  public render() {
    const { PendingPayments, ConfirmPayment } = this.props;

    return (
      <Paper style={classes.root}>
        <Table style={classes.table} padding={'dense'}>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Message</TableCell>
              <TableCell numeric={true}>Amount</TableCell>
              <TableCell numeric={true}>Currency</TableCell>
              <TableCell >Status</TableCell>
              <TableCell numeric={true}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PendingPayments.map(payment => {
              return (
                <TableRow key={payment._id}>
                  {/* <TableCell component="th" scope="row" >
                    {payment._id}
                  </TableCell> */}
                  <TableCell component="th" scope="row" >
                    {payment.creditor.message}
                  </TableCell>
                  <TableCell numeric={true}>{payment.amount}</TableCell>
                  <TableCell numeric={true}>{payment.currency}</TableCell>
                  <TableCell>{payment.paymentStatus}</TableCell>
                  <TableCell numeric={true}>
                    {payment.paymentStatus === 'PendingConfirmation' && <Button variant="contained" color="primary" onClick={ConfirmPayment(payment._id)}>
                      Confirm
                    </Button>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

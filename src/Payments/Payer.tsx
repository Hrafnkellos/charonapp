import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Payment } from 'functions/src/api/Interfaces/Payment';
import * as React from 'react';
import { Account } from '../../functions/src/api/Interfaces/Account';

const styles = (theme:Theme) => ({
  menu: {
    width: 200,
  },
  textField: {
    minWidth: 200,
  },
});

function Payer (props:IPPayer) {
  const { handleChangeAccount, classes, Accounts, selectedAccount, payment, handleChangeParticipant } = props;
  const selectedAccountElement = Accounts.find(x => x.accountNumber.value === selectedAccount);

  return (
    <Grid container={true} item={true} xs={12}>
      <Grid item={true} xs={12}>
        <Typography variant="headline" component="h5" style={{marginTop:15}}>
          Payer
        </Typography>
      </Grid>
      <Grid item={true} xs={3}>
        <TextField
          id="filled-select-currency"
          select={true}
          label="Withdrawal account"
          className={classes.textField}
          value={selectedAccount}
          onChange={handleChangeAccount('creditor')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {Accounts.map((account:Account) => (
            <MenuItem key={account.accountNumber.value} value={account.accountNumber.value}>
              {account.accountNumber.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item={true} xs={3}>
        <TextField
          id="Message"
          label="Payers Message"
          value={payment.creditor.message}
          onChange={handleChangeParticipant("creditor", "message")}
          margin="normal"
        />
      </Grid>
      <Grid item={true} xs={3}>
        <TextField
          id="PayerName"
          label="Payer Name"
          value={payment.creditor.name}
          onChange={handleChangeParticipant("creditor", "name")}
          margin="normal"
        />
      </Grid>
      <Grid item={true} xs={3} style={{textAlign: 'left', paddingTop: 40}}>
        AvailableBalance: {selectedAccountElement && selectedAccountElement.availableBalance}
      </Grid>
    </Grid>
  )
}

interface IPPayer {
  classes: any;
  Accounts: Account[],
  handleChangeAccount?: any,
  selectedAccount: string,
  payment:Payment,
  handleChangeParticipant: any,
};

export const PayerTemplate = withStyles(styles)(Payer);

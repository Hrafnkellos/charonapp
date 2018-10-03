import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { Account } from '../../functions/src/api/Interfaces/Account';

const styles = (theme:Theme) => ({
  menu: {
    width: 200,
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    minWidth: 200,
  },
});

function Payer (props:IPPayer) {
  const { handleChangeAccount, classes, Accounts, selectedAccount } = props;

  return (
    <Grid item={true} xs={12}>
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
  )
}


interface IPPayer {
  classes: any;
  Accounts: Account[],
  handleChangeAccount?: any,
  selectedAccount: string,
};

export const PayerTemplate = withStyles(styles)(Payer);

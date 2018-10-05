import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Payment } from 'functions/src/api/Interfaces/Payment';
import * as React from 'react';

const styles = (theme:Theme) => ({
  menu: {
    width: 200,
  },
  textField: {
    minWidth: 200,
  },
});

function Payer (props:IPReceiver) {
  const { handleChangeAccount, payment } = props;

  return (
    <Grid container={true} item={true} xs={12}>
      <Grid item={true} xs={12}>
        <Typography variant="headline" component="h5" style={{marginTop:15}}>
          Receiver
        </Typography>
      </Grid>
      <Grid item={true} xs={4}>
        <TextField
          id="ReceiverAccoutNumber"
          label="ReceiverAccoutNumber"
          value={payment.debtor.account.value}
          onChange={handleChangeAccount("debtor")}
          margin="normal"
        />
      </Grid>
    </Grid>
  )
}

interface IPReceiver {
  handleChangeAccount?: any,
  payment: Payment,
};

export const ReceiverTemplate = withStyles(styles)(Payer);

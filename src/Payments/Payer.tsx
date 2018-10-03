import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { Component } from 'react';

export class Payer extends Component<any,any> {

  constructor(props:any) {
    super(props);
    this.state = {
      accounts: []
    }
  }

  public render() {
    const { handleChangeAccount } = this.props;

    return (
      <Grid item={true} xs={12}>
      <TextField
        id="PayerAccoutNumber"
        label="PayerAccoutNumber"
        value={this.state.payment.creditor.account.value}
        onChange={handleChangeAccount("creditor")}
        margin="normal"
      />
      </Grid>
    )
  }
}


// interface IMySnackbarContent {
//   classes: any;
//   className?: string,
//   message?: any,
//   onClose?: any,
//   variant: 'success' |  'warning'| 'error'|  'info'
// };

// export const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

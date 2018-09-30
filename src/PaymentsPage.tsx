import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Component } from 'react';
import { Payment } from '../functions/src/api/Interfaces/Payment';

class Payments extends Component<any,ISPayment> {

  constructor(props:any) {
    super(props);
    this.state = {
      CurrencyCodes: ["SEK","ISK","EUR","USD"],
      payment: {
        amount: "",
        creditor: {
          account: {
            _type: "",
            currency: "SEK",
            value: "",
          },
          message:"",
          name: "",
        },
        currency: "SEK",
        debtor: {
          account: {
            _type: "",
            currency: "",
            value: ""
          }
        }

      }
    }
  }

  public PerformPayment() {
    alert("not implemented");
  };

  public handleChange = (name:string) => (event:any) => {
    this.setState({
      payment: {
        ...this.state.payment,
        [name]: event.target.value,
      }
    });
  };

  public render() {
    return (
      <div>
        <Paper style={{padding:30}}>
          <Grid container={true} spacing={24}>
            <Grid item={true} xs={12}>
              <Typography variant="headline" component="h2" style={{display:'block'}}>
              Payment
            </Typography>
            </Grid>
            <Grid item={true} xs={12}>
              <form noValidate={true} autoComplete="off">
                <TextField
                  id="amount"
                  label="Amount"
                  value={this.state.payment.amount}
                  onChange={this.handleChange('amount')}
                  margin="normal"
                />
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

interface ISPayment {
  payment: Payment;
  CurrencyCodes : string[];
}

export default Payments;

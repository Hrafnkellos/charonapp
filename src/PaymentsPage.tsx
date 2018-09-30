import Button from '@material-ui/core/Button';
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
            _type: "BBAN_SE",
            currency: "SEK",
            value: "13370233835",
          },
          message:"",
          name: "",
        },
        currency: "SEK",
        debtor: {
          account: {
            _type: "BBAN_SE",
            currency: "SEK",
            value: "41770042136"
          }
        }
      }
    }
  }

  public PerformPayment = () => {

    const myRequest = new Request("http://localhost:5000/payments/domestic",{// 'http://localhost:5000/charon-lb/us-central1/api/payments/domestic', {
      body: JSON.stringify(this.state.payment),
      cache: 'default',
      headers: new Headers({
        "Content-Type": "application/json",
      }) ,
      method: 'POST',
      mode: 'cors',
    } as RequestInit);

    fetch(myRequest)
    .then(response => response.json())
    .then(jsonResponse => {
      const temp = console;
      temp.log(jsonResponse);
      // this.setState({
      //   accounts: jsonResponse.accounts
      // });
    });  };

  public handleChange = (name:string) => (event:any) => {
    this.setState({
      payment: {
        ...this.state.payment,
        [name]: event.target.value,
      }
    });
  };

  public handleChangeCreditAccount = (type:string) => (event:any) => {
    this.setState({
      payment: {
        ...this.state.payment,
        [type]: {
          ...this.state.payment[type],
          account: {
            ...this.state.payment[type].account,
            value: event.target.value,
          }
        },
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
                <Grid item={true} xs={12}>
                  <TextField
                    id="amount"
                    label="Amount"
                    value={this.state.payment.amount}
                    onChange={this.handleChange('amount')}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="PayerAccoutNumber"
                    label="PayerAccoutNumber"
                    value={this.state.payment.creditor.account.value}
                    onChange={this.handleChangeCreditAccount("creditor")}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="ReceiverAccoutNumber"
                    label="ReceiverAccoutNumber"
                    value={this.state.payment.debtor.account.value}
                    onChange={this.handleChangeCreditAccount("debtor")}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12} style={{marginTop:15}}>
                  <Button variant="contained" color="primary" onClick={this.PerformPayment}>
                    Transfer
                  </Button>
                </Grid>
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

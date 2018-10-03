import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Component } from 'react';
import { Account } from '../../functions/src/api/Interfaces/Account';
import { Payment } from '../../functions/src/api/Interfaces/Payment';
import { PendingPayment } from '../../functions/src/api/Interfaces/PendingPayment';
import { MySnackbarContentWrapper } from '../SnackBar';
import { PayerTemplate } from './Payer';
import { PendingPaymentsList } from './PendingPaymentsList';

const initialState:ISPayment = {
  Accounts: [],
  CurrencyCodes: ["SEK","ISK","EUR","USD"],
  PaymentBooked: false,
  PendingPayments: [],
  SnackbarOpen: false,
  payment: {
    amount: "",
    creditor: {
      account: {
        _type: "BBAN_SE",
        currency: "SEK",
        value: "13370233835",
      },
      message:"Another",
      name: "Beneficiary name",
    },
    currency: "SEK",
    debtor: {
      account: {
        _type: "BBAN_SE",
        currency: "SEK",
        value: "41770042136"
      }
    },
    externalId: "string",
  },
}

class Payments extends Component<any,ISPayment> {

  // private host = 'https://us-central1-charon-lb.cloudfunctions.net/api/payments/domestic';
  private host = 'http://localhost:5000';

  constructor(props:any) {
    super(props);
    this.state = initialState;
    this.FetchPendingPayments();
    this.GetAccounts();
  }

  public FetchPendingPayments() {
    fetch(this.host+'/payments/domestic')
    .then(response => response.json())
    .then(jsonResponse => {
      this.setState({
        ...this.state,
        PendingPayments: jsonResponse.payments ? jsonResponse.payments : []
      });
    });
  }

  public ResetPayment = () => {
    this.setState({
      ...this.state,
      PaymentBooked: false,
      payment: initialState.payment,
    });
  }

  public PerformPayment = () => {
    const myRequest = new Request(this.host+'/payments/domestic',{
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
      this.FetchPendingPayments();
      this.setState({
        ...this.state,
        PaymentBooked: true,
        SnackbarOpen: true,
      });
    });
  };

  public handleSnackbarClose = () => {
    this.setState({ SnackbarOpen: false });
  };

  public handleChange = (name:string) => (event:any) => {
    this.setState({
      payment: {
        ...this.state.payment,
        [name]: event.target.value,
      }
    });
  };

  public ConfirmPayment = (id:string) => () => {
    fetch(new Request(`${this.host}/payments/domestic/${id}`, {
      cache: 'default',
      headers: new Headers({
        "Content-Type": "application/json",
      }) ,
      method: 'PUT',
      mode: 'cors',
    } as RequestInit))
    .then(response => response.json())
    .then(jsonResponse => {
      setTimeout( this.FetchPendingPayments, 1000);
    });
  };

  public GetAccounts() {
    fetch(this.host+'/accounts')
    .then(response => response.json())
    .then(jsonResponse => {
      this.setState({
        ...this.state,
        Accounts: jsonResponse.accounts,
        payment: {
          ...this.state.payment,
          creditor: {
            ...this.state.payment.creditor,
            account: jsonResponse.accounts[0].accountNumber
          }
        }
      });
    });
  }

  public handleChangeAccount = (type:string) => (event:any) => {
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

  public handleChangeParticipant = (type:string, field:string) => (event:any) => {
    this.setState({
      payment: {
        ...this.state.payment,
        [type]: {
          ...this.state.payment[type],
          [field]: event.target.value,
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
                <PayerTemplate handleChangeAccount={this.handleChangeAccount} Accounts={this.state.Accounts} selectedAccount={this.state.payment.creditor.account.value}/>
                {/* <Grid item={true} xs={12}>
                  <TextField
                    id="PayerAccoutNumber"
                    label="PayerAccoutNumber"
                    value={this.state.payment.creditor.account.value}
                    onChange={this.handleChangeAccount("creditor")}
                    margin="normal"
                  />
                </Grid> */}
                <Grid item={true} xs={12}>
                  <TextField
                    id="ReceiverAccoutNumber"
                    label="ReceiverAccoutNumber"
                    value={this.state.payment.debtor.account.value}
                    onChange={this.handleChangeAccount("debtor")}
                    margin="normal"
                  />
                </Grid>

                <Grid item={true} xs={12}>
                  <TextField
                    id="ExternalId"
                    label="External Id"
                    value={this.state.payment.debtor.account.value}
                    onChange={this.handleChange('externalId')}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="Message"
                    label="Receivers Message"
                    value={this.state.payment.creditor.message}
                    onChange={this.handleChangeParticipant("creditor", "message")}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <TextField
                    id="ReceiversName"
                    label="Receivers Name"
                    value={this.state.payment.creditor.name}
                    onChange={this.handleChangeParticipant("creditor", "name")}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12} style={{marginTop:15}}>
                  {
                    !this.state.PaymentBooked &&
                    <Button variant="contained" color="primary" onClick={this.PerformPayment}>
                      Transfer
                    </Button>
                  }
                  {
                    this.state.PaymentBooked &&
                    <Button variant="contained" color="secondary" onClick={this.ResetPayment}>
                      New Payment
                    </Button>
                  }
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{padding:30, margin: '15px 0px'}}>
          <Typography variant="headline" component="h2" style={{display:'block'}}>
              Pending Payments
            </Typography>
          <PendingPaymentsList PendingPayments={this.state.PendingPayments} ConfirmPayment={this.ConfirmPayment}/>
        </Paper>
        <Snackbar
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          open={this.state.SnackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          style={{marginTop:50}}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="info"
            message="Payment Booked"
          />
        </Snackbar>
      </div>
    );
  }
}

interface ISPayment {
  payment: Payment;
  CurrencyCodes : string[];
  PaymentBooked: boolean;
  SnackbarOpen: boolean;
  PendingPayments: PendingPayment[],
  Accounts: Account[],
}

export default Payments;

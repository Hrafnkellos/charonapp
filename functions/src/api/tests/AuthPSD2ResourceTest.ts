import axios from 'axios';
import { PSD2Resource } from '../Resources/PSD2Resource';
import { payment } from './MockData';
const logger = console;
const axiosInstance = axios.create();

const X_IBM_Client_ID:string = process.env.N_CLIENT_ID;
const X_IBM_Client_Secret:string = process.env.N_CLIENT_SEACRET;

const PSD2 = new PSD2Resource(axiosInstance, logger, X_IBM_Client_ID, X_IBM_Client_Secret);

setTimeout(async () => {
    const tokenCombo = await PSD2.Accounts.GetAccountsAsync();
    const pay = await PSD2.Payments.InitiatePaymentAsync(payment);
    console.log(JSON.stringify(tokenCombo), JSON.stringify(pay));
},10000);

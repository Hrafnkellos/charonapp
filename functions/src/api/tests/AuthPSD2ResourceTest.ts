import axios from 'axios';
import { PSD2Resource } from '../Resources/PSD2Resource';
import { Payment } from '../Interfaces/Payment';
const logger = console;
const axiosInstance = axios.create();
const X_IBM_Client_ID:string = process.env.N_CLIENT_ID;
const X_IBM_Client_Secret:string = process.env.N_CLIENT_SEACRET;

const PSD2 = new PSD2Resource(axiosInstance, logger, X_IBM_Client_ID, X_IBM_Client_Secret);

setTimeout(async () => {
    const tokenCombo = await PSD2.Accounts.GetAccountsAsync();
    console.log( tokenCombo);
},7000);

// (async function () {
// })();

// const AuthorizationResource = new AuthPSD2Resource(axiosInstance, logger);

// const payment:Payment = {
//     "amount": "1.13",
//     "creditor": {
//       "account": {
//         "_type": "BBAN_SE",
//         "currency": "SEK",
//         "value": "13370233835"
//       },
//       "message": "Another",
//       "name": "Beneficiary name"
//     },
//     "currency": "SEK",
//     "debtor": {
//       "account": {
//         "_type": "BBAN_SE",
//         "currency": "SEK",
//         "value": "41770042136"
//       },
//       "message": "Own message"
//     },
//     "externalId": "string"
//   } ;

// (async function () {
//     const tokenCombo = await AuthorizationResource.GetThirdPartyProviderTokenAsync();
//     console.log( tokenCombo);
// })();

import axios from 'axios';
import { AuthPSD2Resource } from '../Resources/AuthPSD2Resource';
const logger = console;
const axiosInstance = axios.create();

const AuthorizationResource = new AuthPSD2Resource(axiosInstance, logger);

const payment = {
    "amount": "1.13",
    "creditor": {
      "account": {
        "_type": "BBAN_SE",
        "currency": "SEK",
        "value": "13370233835"
      },
      "message": "Another",
      "name": "Beneficiary name"
    },
    "currency": "SEK",
    "debtor": {
      "account": {
        "_type": "BBAN_SE",
        "currency": "SEK",
        "value": "41770042136"
      },
      "message": "Own message"
    },
    "externalId": "string"
  } ;

(async function () {
    const tokenCombo = await AuthorizationResource.GetThirdPartyProviderTokenAsync();
    console.log( tokenCombo);
})();

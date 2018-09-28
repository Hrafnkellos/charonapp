import { Payment } from "../Interfaces/Payment";

export const payment:Payment = {
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
};
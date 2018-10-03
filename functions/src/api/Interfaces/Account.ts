export interface Account  {
  _id:string;
  _links?:Array<Link>;
  accountName:string;
  accountNumber:AccountNumber;
  accountNumbers:Array<AccountNumber>;
  accountType:string;
  availableBalance:string;
  bank:Bank;
  bookedBalance:string;
  country?:string;
  creditLimit?:string;
  currency:string;
  latestTransactionBookingDate?:string;
  ownerName?:string;
  product:string;
  status:string;
  valueDatedBalance?:string;

}

interface Link {
  href:string;
  rel:string;
}

interface AccountNumber {
  _type:string;
  value?:string;
}

interface Bank {
  bic:string;
  country:string;
  name:string
}

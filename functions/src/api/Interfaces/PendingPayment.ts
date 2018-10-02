import { Creditor, Account } from './Payment';

export interface PendingPayment {
  _id: string,
  paymentStatus: "PendingConfirmation" | string,
  _links: Link[],
  amount: number,
  currency: string,
  debtor: {
      _accountId: string,
      account: Account,
  },
  creditor: Creditor,
}

export interface Link {
  rel: string,
  href: string,
}

/*~ You can declare types that are available via importing the module */
export interface Payment {
    amount?: string;
    creditor: Creditor;
    reference?: Reference;
    currency: string;
    debtor: Deptor;
    externalId?: string;
}

export interface Deptor {
    account: Account;
    message?: string;
}

export interface Reference {
    _type: string;
    value?: string;
}

export interface Creditor {
    account: Account;
    message: string;
    name: string;
}

export interface Account {
    _type: string;
    currency: string;
    value: string;
}

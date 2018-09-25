import { AxiosInstance } from 'axios';

/** Accounts PSD2 Nordea Resource */
export class AccountsPSD2Resource {

    private X_IBM_Client_ID:string = process.env.N_CLIENT_ID;
    private X_IBM_Client_Secret:string = process.env.N_CLIENT_SEACRET;

    private axios:AxiosInstance;
    private logger:Console;

    constructor(axios:AxiosInstance, logger:Console) {
        this.axios = axios;
        this.logger = logger;
    }

    ErrorHandler(err, response, body, cb) {
        if(err) {
            err.statusCode = 500;
            cb(err);
            return;
        }
        if(response.statusCode >= 400) {
            cb(body);
            return;
        }
    }

    async GetAccountsAsync(access_token) {
        try {
            this.logger.time("GetAccountsAsync");
            const response = await this.axios({
                url: 'https://api.nordeaopenbanking.com/v2/accounts',
                method: 'GET',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                    'Authorization': `Bearer ${access_token}`
                },
            });
            this.logger.timeEnd("GetAccountsAsync");
            const {accounts} = response.data.response;
            return { 
                accounts
            };
        } catch (error) {
            return error;
        }
    }

    async GetAccountDetailsAsync(access_token, account_id) {
        try {
            this.logger.time("GetAccountDetailsAsync");
            const response = await this.axios({
                url: `https://api.nordeaopenbanking.com/v2/accounts/${account_id}`,
                method: 'GET',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                    'Authorization': `Bearer ${access_token}`
                },
            });
            this.logger.timeEnd("GetAccountDetailsAsync");
            return response.data.response;
        } catch (error) {
            return error;
        }
    }

    async GetAccountTransactionsAsync(access_token, account_id) {
        try {
            this.logger.time("GetAccountTransactionsAsync");
            const response = await this.axios({
                url: `https://api.nordeaopenbanking.com/v2/accounts/${account_id}/transactions`,
                method: 'GET',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                    'Authorization': `Bearer ${access_token}`
                },
            });
            this.logger.timeEnd("GetAccountTransactionsAsync");
            const { transactions } = response.data.response;
            return {
                transactions
            };
        } catch (error) {
            return error;
        }
    }
}
import { AxiosInstance } from 'axios';
import { Payment } from '../Interfaces/Payment';

/** Accounts PSD2 Nordea Resource */
export class PaymentsPSD2Resource {

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

    async GetPaymentsAsync(access_token) {
        try {
            this.logger.time("GetPaymentsAsync");
            const response = await this.axios({
                url: 'https://api.nordeaopenbanking.com/payments/domestic',
                method: 'POST',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                    'Authorization': `Bearer ${access_token}`
                },
            });
            this.logger.timeEnd("GetPaymentsAsync");
            return response.data.response;
        } catch (error) {
            return error;
        }
    }

    async InitiatePaymentAsync(payment:Payment) {
        try {
            this.logger.time("InitiatePaymentAsync");
            const response = await this.axios({
                url: 'https://api.nordeaopenbanking.com/v2/payments/domestic',
                method: 'POST',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                },
                data: payment,
            });
            this.logger.timeEnd("InitiatePaymentAsync");
            return response.data.response;
        } catch (error) {
            return error;
        }
    }
}
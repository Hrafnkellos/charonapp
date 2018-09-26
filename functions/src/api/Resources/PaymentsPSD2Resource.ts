import { AxiosInstance } from 'axios';
import { Payment } from '../Interfaces/Payment';

/** Accounts PSD2 Nordea Resource */
export class PaymentsPSD2Resource {

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
            });
            this.logger.timeEnd("GetPaymentsAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("InitiatePaymentAsync");
            return error;
        }
    }

    async InitiatePaymentAsync(payment:Payment) {
        try {
            this.logger.time("InitiatePaymentAsync");
            const response = await this.axios({
                url: 'https://api.nordeaopenbanking.com/v2/payments/domestic',
                method: 'POST',
                data: payment,
            });
            this.logger.timeEnd("InitiatePaymentAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("InitiatePaymentAsync");
            return error;
        }
    }
}
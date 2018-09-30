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

    async GetPaymentsAsync() {
        try {
            this.logger.time("GetPaymentsAsync");
            const response = await this.axios({
              url: '/payments/domestic',
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
              url: '/payments/domestic',
              method: 'POST',
              data: payment,
            });
            this.logger.timeEnd("InitiatePaymentAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("InitiatePaymentAsync");
            throw error;
        }
    }

    async GetPaymentAsync(payment_id:string) {
        try {
            this.logger.time("GetPaymentAsync");
            const response = await this.axios({
              url: `/v2/payments/domestic${payment_id}`,
              method: 'GET',
            });
            this.logger.timeEnd("GetPaymentAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("GetPaymentAsync");
            return error;
        }
    }

    async ConfirmPaymentAsync(payment_id:string) {
        try {
            this.logger.time("ConfirmPaymentAsync");
            const response = await this.axios({
              url: `/v2/payments/domestic${payment_id}/confirm`,
              method: 'GET',
            });
            this.logger.timeEnd("ConfirmPaymentAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("ConfirmPaymentAsync");
            return error;
        }
    }
}

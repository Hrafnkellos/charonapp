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

    async GetPaymentsAsync() {
        try {
            this.logger.time("GetPaymentsAsync");
            const response = await this.axios({
              url: '/payments/domestic',
              method: 'GET',
            });
            this.logger.timeEnd("GetPaymentsAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("GetPaymentsAsync");
            this.logger.log(error);
            throw error;
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
            this.logger.log(error);
            throw error;
        }
    }

    async GetPaymentAsync(payment_id:string) {
        try {
            this.logger.time("GetPaymentAsync");
            const response = await this.axios({
              url: `/payments/domestic/${payment_id}`,
              method: 'GET',
            });
            this.logger.timeEnd("GetPaymentAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("GetPaymentAsync");
            this.logger.log(error);
            throw error;
        }
    }

    async ConfirmPaymentAsync(payment_id:string) {
        try {
            this.logger.time("ConfirmPaymentAsync");
            const response = await this.axios({
              url: `/payments/domestic/${payment_id}/confirm`,
              method: 'PUT'
            });
            this.logger.timeEnd("ConfirmPaymentAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("ConfirmPaymentAsync");
            this.logger.log(error);
            throw error;
        }
    }
}

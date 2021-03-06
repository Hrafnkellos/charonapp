import { AxiosInstance } from 'axios';

/** Accounts PSD2 Nordea Resource */
export class AccountsPSD2Resource {

    private axios:AxiosInstance;
    private logger:Console;

    constructor(axios:AxiosInstance, logger:Console) {
        this.axios = axios;
        this.logger = logger;
    }

    async GetAccountsAsync():Promise<any> {
        try {
          this.logger.time("GetAccountsAsync");
          const response = await this.axios({
              url: '/accounts',
              method: 'GET',
          });
          this.logger.timeEnd("GetAccountsAsync");
          const {accounts} = response.data.response;
          return {
              accounts
          };
        } catch (error) {
          this.logger.timeEnd("GetAccountsAsync");
          this.logger.log(error);
          throw error;
        }
    }

    async GetAccountDetailsAsync(account_id):Promise<any> {
        try {
            this.logger.time("GetAccountDetailsAsync");
            const response = await this.axios({
                url: `/accounts/${account_id}`,
                method: 'GET',
            });
            this.logger.timeEnd("GetAccountDetailsAsync");
            return response.data.response;
        } catch (error) {
            this.logger.timeEnd("GetAccountDetailsAsync");
            this.logger.log(error);
            throw error;
        }
    }

    async GetAccountTransactionsAsync(account_id):Promise<any> {
        try {
            this.logger.time("GetAccountTransactionsAsync");
            const response = await this.axios({
                url: `/accounts/${account_id}/transactions`,
                method: 'GET',
            });
            this.logger.timeEnd("GetAccountTransactionsAsync");
            const { transactions } = response.data.response;
            return {
                transactions
            };
        } catch (error) {
            this.logger.timeEnd("GetAccountTransactionsAsync");
            this.logger.log(error);
            throw error;
        }
    }
}

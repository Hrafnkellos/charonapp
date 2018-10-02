import { AxiosInstance } from 'axios';

export class AuthPSD2Resource {

    private axios:AxiosInstance;
    private logger:Console;

    constructor(axios:AxiosInstance, logger:Console) {
        this.axios = axios;
        this.logger = logger;
    }

    async GetThirdPartyProviderTokenAsync() {
        try {
            this.logger.time("GetThirdPartyProviderTokenAsync");
            const response = await this.axios({
                url: '/authorize-decoupled',
                method: 'POST',
                data: {
                    "response_type": "nordea_code",
                    "psu_id": "193805010844",
                    "scope": ["ACCOUNTS_BASIC","PAYMENTS_MULTIPLE","ACCOUNTS_TRANSACTIONS","ACCOUNTS_DETAILS","ACCOUNTS_BALANCES"],
                    "language": "SE",
                    "redirect_uri": "https://httpbin.org/get",
                    "account_list": ["41770042136"],
                    "duration": 129600,
                    "state": "some id"
                  },
            });
            this.logger.timeEnd("GetThirdPartyProviderTokenAsync");
            const {order_ref, tpp_token} = response.data.response;
            return {
                order_ref,
                tpp_token
            };
        } catch (error) {
            this.logger.timeEnd("GetThirdPartyProviderTokenAsync");
            this.logger.log('error', error);
            throw error;
        }
    }

    async GetAuthorizationTokenAsync(order_ref) {
        try {
            this.logger.time("GetAuthorizationTokenAsync");
            const response = await this.axios({
                url: `/authorize-decoupled/${order_ref}`,
                method: 'GET',
            });
            this.logger.timeEnd("GetAuthorizationTokenAsync");
            return response.data.response.code;
        } catch (error) {
            this.logger.timeEnd("GetAuthorizationTokenAsync");
            this.logger.log('error', error);
            throw error;
        }
    }

    async GetAccessTokenAsync(code) {
        try {
            this.logger.time("GetAccessTokenAsync");
            const response = await this.axios({
                url: "/authorize-decoupled/token",
                method: 'POST',
                data: {
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": "https://httpbin.org/get",
                },
            });
            this.logger.timeEnd("GetAccessTokenAsync");
            return response.data;
        } catch (error) {
            this.logger.timeEnd("GetAccessTokenAsync");
            this.logger.log('error', error);
            throw error;
        }
    }
}

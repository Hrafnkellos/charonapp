import { AxiosInstance } from 'axios';

export class AuthPSD2Resource {

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

    async GetThirdPartyProviderTokenAsync() {
        try {
            this.logger.time("GetThirdPartyProviderTokenAsync");
            const response = await this.axios({
                url: 'https://api.nordeaopenbanking.com/v2/authorize-decoupled',
                method: 'POST',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                },
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
            return error;
        }
    }

    async GetAuthorizationTokenAsync(tppCombo) {
        try {
            this.logger.time("GetAuthorizationTokenAsync");
            const response = await this.axios({
                url: `https://api.nordeaopenbanking.com/v2/authorize-decoupled/${tppCombo.order_ref}`,
                method: 'GET',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                    "Authorization": `Bearer ${tppCombo.tpp_token}`,
                },
            });
            this.logger.timeEnd("GetAuthorizationTokenAsync");
            const {code} = response.data.response;
            return { 
                code,
            };
        } catch (error) {
            return error;
        }
    }

    async GetAccessTokenAsync(tppCombo, code) {
        try {
            this.logger.time("GetAccessTokenAsync");
            const response = await this.axios({
                url: "https://api.nordeaopenbanking.com/v2/authorize-decoupled/token",
                method: 'GET',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                    "Authorization": `Bearer ${tppCombo.tpp_token}`,
                },
            });
            this.logger.timeEnd("GetAccessTokenAsync");
            return response.data.response;
        } catch (error) {
            return error;
        }
    }
}
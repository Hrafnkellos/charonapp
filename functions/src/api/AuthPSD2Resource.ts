import { AxiosInstance } from 'axios';

export class AuthPSD2Resource {

    X_IBM_Client_ID = process.env.N_CLIENT_ID;
    X_IBM_Client_Secret = process.env.N_CLIENT_SEACRET;

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

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async GetThirdPartyProviderTokenAsync() {
        try {
            this.logger.time("GetThirdPartyProviderToken");
            const response = await this.axios({
                url: 'https://api.nordeaopenbanking.com/v2/authorize-decoupled',
                method: 'POST',
                maxRedirects: 0,
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-IBM-Client-ID": this.X_IBM_Client_ID,
                    "X-IBM-Client-Secret": this.X_IBM_Client_Secret
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
            this.logger.timeEnd("GetThirdPartyProviderToken");
            const {order_ref, tpp_token} = response.data.response;
            return { 
                order_ref,
                tpp_token
            };
        } catch (error) {
            return error;
        }
    }

    // GetThirdPartyProviderToken(cb) {
    //     this.logger.time("GetThirdPartyProviderToken");
    //     this.request.post({ 
    //         url: "https://api.nordeaopenbanking.com/v2/authorize-decoupled",
    //         headers: {
    //             "Accept":"application/json",
    //             "Content-Type":"application/json",
    //             "X-IBM-Client-ID": this.X_IBM_Client_ID,
    //             "X-IBM-Client-Secre": this.X_IBM_Client_Secret
    //         },
    //         followRedirect: false,
    //         json: { 
    //             "response_type": "nordea_code",
    //             "psu_id": "193805010844",
    //             "scope": ["ACCOUNTS_BASIC","PAYMENTS_MULTIPLE","ACCOUNTS_TRANSACTIONS","ACCOUNTS_DETAILS","ACCOUNTS_BALANCES"],
    //             "language": "SE",
    //             "redirect_uri": "https://httpbin.org/get",
    //             "account_list": ["41770042136"],
    //             "duration": 129600,
    //             "state": "some id"
    //           }
    //         }, (err, response, body)=> 
    //         {
    //             this.logger.timeEnd("GetThirdPartyProviderToken");
    //             this.ErrorHandler(err, response, body, cb);
    //             cb(
    //                 null,
    //                 {
    //                     order_ref: body.response.order_ref,
    //                     tpp_token: body.response.tpp_token
    //                 }
    //             );
    //             return;
    //         }
    //     );
    // }

    // GetAuthorizationToken(tppCombo, cb) {
    //     this.logger.time("GetAuthorizationToken");
    //     this.request.get({ 
    //         url: `https://api.nordeaopenbanking.com/v2/authorize-decoupled/${tppCombo.order_ref}`,
    //         headers: {
    //             "Accept":"application/json",
    //             "Content-Type":"application/json",
    //             "X-IBM-Client-ID": this.X_IBM_Client_ID,
    //             "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
    //             "Authorization": `Bearer ${tppCombo.tpp_token}`
    //         },
    //         followRedirect: false,
    //         }, (err, response, body)=> 
    //         {
    //             this.logger.timeEnd("GetThirdPartyProviderToken");
    //             this.ErrorHandler(err, response, body, cb);
    //             cb(
    //                 null,
    //                 {
    //                     code: body.response.code,
    //                 }
    //             );
    //             return;
    //         }
    //     );
    // }

    GetAccessToken() {
        "https://api.nordeaopenbanking.com/v2/authorize-decoupled/token"
        /*[
            {"key":"Accept","value":"application/json"},
            {"key":"Content-Type","value":"application/json"},
            {"key":"Authorization","value":"Bearer {{tpp_token}}"},
            {"key":"X-IBM-Client-Id","value":"{{X-IBM-Client-ID}}"},
            {"key":"X-IBM-Client-Secret","value":"{{X-IBM-Client-Secret}}"}
        ] */
        /* 
        {
            "access_token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiZGlyIn0..Vv6jThVG6UYMxB-A.Ha3gehgTXatCs4PRvANjoAbath9h73uAGOQ3AzepeBWj2gEoJSO0xi8JB9uka_S0k_pF_6MYH3HkTq_X4QUteuiTAJHY0TXEFZ-RHYgEau-3NTC7Rv35rm1Gfs7DPaDk6Lmn0FJFWS_C_L3OC7fxiFnGGv1qEOQZSohXtxD_WWRM2fyP1w3jRm434S6shSFAUk2mYUdASeJccMDseKdVf-8PFBkM8_dSJ4BY5lAtcZASsUr0Z6OKSAXM-hZIziEDoU6oWNYOHuHy_yor-vDHaOP1SvrB2bRAjvYv807eyWNyqPffIqjk96eW4wlGlV05RzyXWL0vxjuJYBirDUOb3dOp_16vIAjp0A_OKznEjtE9lUky0S7SacqUEYHREWwiCa4BLgdw2B5Wm-dREdhOPmyHrhFcTqctn8EESD7biYCVtlXPxpnC2ibE3oncec5KxGJ3hHjDUzRrSYDH3dpWF5ZnO-ecMH4r5bIp-3KOCGBpM2P_ar3n4G51HdJh67cRuZ26Hpooqyf_fScB2-t5FJPvbb8jM7a9QnKtR6GLFnqyp8_g_Q_t7pT3azHuc9HmKjmz-SrboHE3kdNOp84lZervkvH_kSA_qiLBWueJ_VtAm4furIWtjhwleInYzxkqLLGOVOuw9chxHNT5C8K7kjG0XNxv06t9s_xKYSsxOD05voW4WSiCEUadq1clUTDM2QIMJEBqpzIy_SH8dhgJDxooEn3goO9TBxWCIIvmg3663Ve7GU-b2h9qJe44OiWU6bD4bTTst6BaK9i_1lvne5dhmOwK2mbWRbqvQQFa8vAWfSQaDKpdLtzXxFeUGhtGzveda_WUE_ZWp-O6s109LyXBGUeLjiUg8OUK6SCmywvokVGJBA0woy-20MxibQUS3-6OOq7OwzJ-t1k9ZqQPH3Zbgwvla2vDZPWpZIhYijAFbHjDDcn65_uGChyUSAYTWhI8pe0pL0e1xCE5c8zobnuZpzMgfS6DpjeCICKkePJZgYTBZv-XISpNb1XMgrV4B0enzi1ldOphzZA2hMvkGyYGUjFsIKMjB0oaGqXcQtmVeRDgMgJ133QIIwUTDQ2ybn6mpi70kDEtA_FI0w4Dh0oykcFEu3Z4wI9e36qiW7i3f4Tfd0zJx_VYy38bGGIRcmTL2Foquxqk1D2WCtHwxrIV7YvO1XLNMwqkITo51Jvvil4wf3tUcV79Zaumb770cWpCuzsrksy2W2BmU9B5H7F7-rpv2oor7w0BtQ.xQ5gMohJCBiwEdXuIs6WJg",
            "expires_in": 7775999,
            "token_type": "Bearer"
        }
        */
        return {};
    }

}
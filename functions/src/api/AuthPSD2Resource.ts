import { RequestAPI, Request, CoreOptions, RequiredUriUrl } from 'request';

export class AuthPSD2Resource {

    X_IBM_Client_ID = process.env.N_CLIENT_ID;
    X_IBM_Client_Secret = process.env.N_CLIENT_SEACRET;

    request:RequestAPI<Request, CoreOptions, RequiredUriUrl>;
    logger:Console;

    constructor(request, logger) {
        this.request = request;
        this.logger = logger;
    }

    GetThirdPartyProviderToken(cb) {
        this.logger.time("GetThirdPartyProviderToken");
        this.request.post({ 
            url: "https://api.nordeaopenbanking.com/v2/authorize-decoupled",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "X-IBM-Client-ID": this.X_IBM_Client_ID,
                "X-IBM-Client-Secret": this.X_IBM_Client_Secret
            },
            followRedirect: false,
            json: { 
                "response_type": "nordea_code",
                "psu_id": "193805010844",
                "scope": ["ACCOUNTS_BASIC","PAYMENTS_MULTIPLE","ACCOUNTS_TRANSACTIONS","ACCOUNTS_DETAILS","ACCOUNTS_BALANCES"],
                "language": "SE",
                "redirect_uri": "https://httpbin.org/get",
                "account_list": ["41770042136"],
                "duration": 129600,
                "state": "some id"
              }
            }, (err, response, body)=> 
            {
                this.logger.timeEnd("GetThirdPartyProviderToken");
                // this.logger.log(err, response, body);
                const error = response.statusCode === 200 ? null : response.statusCode;
                cb(
                    error,
                    {
                        order_ref: body.response.order_ref,
                        tpp_token: body.response.tpp_token
                    }
                );
            }
        );
    }

    GetAuthorizationToken(tppCombo, cb) {
        this.logger.time("GetAuthorizationToken");
        this.request.get({ 
            url: `https://api.nordeaopenbanking.com/v2/authorize-decoupled/${tppCombo.order_ref}`,
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "X-IBM-Client-ID": this.X_IBM_Client_ID,
                "X-IBM-Client-Secret": this.X_IBM_Client_Secret,
                "Authorization": `Bearer ${tppCombo.tpp_token}`
            },
            followRedirect: false,
            }, (err, response, body)=> 
            {
                this.logger.timeEnd("GetThirdPartyProviderToken");
                // this.logger.log(err, response, body);
                const error = response.statusCode === 200 ? null : response.statusCode;
                cb(
                    error,
                    {
                        code: body.response.code,
                    }
                );
            }
        );
        
        /*[
            {"key":"Accept","value":"application/json"},
            {"key":"Content-Type","value":"application/json"},
            {"key":"Authorization","value":"Bearer {{tpp_token}}"},
            {"key":"X-IBM-Client-Id","value":"{{X-IBM-Client-ID}}"},
            {"key":"X-IBM-Client-Secret","value":"{{X-IBM-Client-Secret}}"}
        ] */
        /* 
        {
            "groupHeader": {
                "messageIdentification": "FNwipseRYUw",
                "creationDateTime": "2018-09-16T01:39:11.764Z"
            },
            "response": {
                "code": "eyJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiZGlyIn0..DP-SkBZdH-8VELyP.L2wU8UKoKxkApGovBwSm-o7Ultdj5vHzxUYpyzK2B6NKpKAy8gFOpqbZuZPG9uvRiCeJuehUVGa-U-8lyVK_uR_IdyEseBLKf9_G7H9_t6XPFnmkw4h1975cjm7EMdnEJvHf5cnURQ2U487In5GLZelzV-uIQyRvv1cyn8JqE9Q5TK55dyvNic4C0ApwDaoysuqHzreeGhm14SP3b8r4hgrAZSpkkuPucvmY17vdtmacAkWXj3f3BVIyRStI9iRPHJL0xEYYw8rLA_lCHxmcWvBjNQTPH825ybX1A8APJ3JHy2-WOP8YfDXQayptl_dAxPFwIlmTkKELn2eCqUiSa5D0ZDBYWI4Gl5M0xfMF1xT-BoVLt7cvq_Ni3SLTGtZ2-jf1jNTm3c8juTZL9iFXY4fmscXxP41zkd0fQiviUSppa6dhhSL9oXZauzFYHEX0lh8lvNoT-FvXMd6BRrxQhrMEVIS2KUwa7bLHYYU6p8TydrJTfgAPE3YYcicDuJ6jZHIm-NwSgMS1L3l-_8u3c4q6bX5xvlHsxpnBuvxw1m1osw5FNxS2V7Ok7C9fBrjEoWaIH2kil1C_VMLr.5OWaH_tPbTMWPjOeaw6TRQ",
                "state": "COMPLETED",
                "links": [
                    {
                        "rel": "code",
                        "href": "/v2/authorize-decoupled/token"
                    }
                ]
            }
        }
        */
        return {};
    }

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
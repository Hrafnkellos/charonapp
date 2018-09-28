import { AxiosInstance } from 'axios';
import { AuthPSD2Resource } from './AuthPSD2Resource';
import { AccountsPSD2Resource } from './AccountsPSD2Resource';
import { PaymentsPSD2Resource } from './PaymentsPSD2Resource';

/** Accounts PSD2 Nordea Resource */
export class PSD2Resource {

    private thirdPartyTokenCombo;
    private AuthToken;
    private AccessToken;
    private axios:AxiosInstance;
    private logger:Console;
    public Auth:AuthPSD2Resource;
    public Accounts:AccountsPSD2Resource;
    public Payments:PaymentsPSD2Resource;

    constructor(axios:AxiosInstance, logger:Console, clientId:string, clientSeacret:string) {
        axios.defaults.baseURL = "https://api.nordeaopenbanking.com/v2";
        axios.defaults.maxRedirects = 0;
        axios.defaults.headers = {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "X-IBM-Client-ID": clientId,
            "X-IBM-Client-Secret": clientSeacret,
        }
        this.axios = axios;
        this.logger = logger;
        this.Auth = new AuthPSD2Resource(this.axios, this.logger);
        const context = this;
        context.Accounts = new AccountsPSD2Resource(context.axios, context.logger);
        context.Payments = new PaymentsPSD2Resource(context.axios, context.logger);

        (async function () {
            context.Login();
        })();
    }

    public async Login():Promise<void> {
        this.logger.log('Granting access');
        // we get third party provider token
        this.thirdPartyTokenCombo = await this.Auth.GetThirdPartyProviderTokenAsync();
        this.axios.defaults.headers["Authorization"] = `Bearer ${this.thirdPartyTokenCombo.tpp_token}`;
        this.waitForToken();
    }

    private async waitForToken():Promise<void> {
        setTimeout(async () => {
            this.AuthToken = await this.Auth.GetAuthorizationTokenAsync(await this.thirdPartyTokenCombo.order_ref);
            // we get Access token
            this.AccessToken = await this.Auth.GetAccessTokenAsync(this.AuthToken);
            this.axios.defaults.headers["Authorization"] = `Bearer ${this.AccessToken.access_token}`;
            this.logger.log('Access Granted');
        }, 5000);
    }
}

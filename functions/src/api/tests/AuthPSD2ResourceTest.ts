import axios from 'axios';
import { AuthPSD2Resource } from '../Resources/AuthPSD2Resource';
const logger = console;
const axiosInstance = axios.create();
const AuthorizationResource = new AuthPSD2Resource(axiosInstance, logger);



(async function () {
    const tokenCombo = await AuthorizationResource.GetThirdPartyProviderTokenAsync();
    console.log( tokenCombo);
})();

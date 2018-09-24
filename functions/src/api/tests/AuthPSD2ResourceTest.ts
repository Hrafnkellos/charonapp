import * as  request from 'request';
import { AuthPSD2Resource } from '../AuthPSD2Resource';
const logger = console;

const AuthorizationResource = new AuthPSD2Resource(request, logger);

// get tpp token
AuthorizationResource.GetThirdPartyProviderToken((err, tppCombo) => {
    if (err) {
        logger.log(err);
    } else {
        AuthorizationResource.GetAuthorizationToken(tppCombo, token => {
            console.log(token);
        });
    }
});


import axios from 'axios';
import { AuthPSD2Resource } from '../AuthPSD2Resource';
const logger = console;
const axiosInstance = axios.create();

const AuthorizationResource = new AuthPSD2Resource(axiosInstance, logger);

class Cheese {
    private state = "hard";

    public async melt() {
        console.log("Melting...");
        return new Promise((resolve) => {
            setTimeout(() => {
                this.state = "melted";
                resolve();
            }, 2000);
        });
    }
}

class Dough {
    private state = "raw";

    public async bake() {
        console.log("Baking...");
        return new Promise((resolve) => {
            setTimeout(() => {
                this.state = "baked";
                resolve();
            }, 3000);
        });
    }
}

class Pizza {
    private dough: Dough;
    private cheese: Cheese;

    constructor(cheese: Cheese, dough: Dough) {
        this.dough = dough;
        this.cheese = cheese;
    }

    public static async create(cheese: Cheese, dough: Dough): Promise<Pizza> {
        await Promise.all([cheese.melt(), dough.bake()]);
        return new Pizza(cheese, dough);
    }
}

(async function () {
    let cheese = new Cheese();
    let dough = new Dough();
    let pizza = await Pizza.create(cheese, dough);
    const tokenCombo = await AuthorizationResource.GetThirdPartyProviderTokenAsync();
    console.log(pizza, tokenCombo);
})();

// get tpp token


// logger.log(tokenCombo);

// AuthorizationResource.GetThirdPartyProviderToken((err, tppCombo) => {
//     if (err) {
//         logger.log(err);
//     } else {
//         AuthorizationResource.GetAuthorizationToken(tppCombo, token => {
//             console.log(token);
//         });
//     }
// });


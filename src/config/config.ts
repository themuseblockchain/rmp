export namespace Config {
    export const firebaseProd = {
        apiKey: 'AIzaSyDUyOeMNp1nUSBX3JpCjwF1G4ujk-Z6EbU',
        authDomain: 'rights-management-portal.firebaseapp.com',
        databaseURL: 'https://rights-management-portal.firebaseio.com',
        projectId: 'rights-management-portal',
        storageBucket: 'rights-management-portal.appspot.com',
        messagingSenderId: '768176307619'
    };

    export const firebaseDev = {
        apiKey: 'AIzaSyD1cEYjkdkoi3Hn5team4R8yq7s9MIAvxQ',
        authDomain: 'rmp-dev-8a70b.firebaseapp.com',
        databaseURL: 'https://rmp-dev-8a70b.firebaseio.com',
        projectId: 'rmp-dev-8a70b',
        storageBucket: 'rmp-dev-8a70b.appspot.com',
        messagingSenderId: '50686525262'
    };

    const faucet = { // needs to be in a private.json file
        faucetAccount: 'faucet',
        activePrivKey: '5K1PWEeVG7TJDBY5ry4JSV6bce2Us4ZKM1NdCsDHv3UM6tgtMfy',
        recaptchaSiteKey: null,
        recaptchaSecret: null,
        signupRedirectAddress: 'http://localhost:8080/#/register?token=DUMMY',
        museAmount: 0,
        vestAmount: 0,
        museMemo: 'Funds from faucet'
    };

    export const faucet_config = {
        private_wif: faucet.activePrivKey,
        account_creation_fee: '0.000001 2.28.0', // use muse chain property rather than hard coding here, find method in muse-js to get property blockchain
        account: faucet.faucetAccount,
        newAccountVest: faucet.vestAmount,
        newAccountMuse: faucet.museAmount,
        newAccountMuseMemo: 'Funds from faucet',
    };

}

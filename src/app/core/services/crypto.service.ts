import * as cryptojs from 'crypto-js';
import { Utils } from '../../core/utils';
import { MuseAuthService } from '../muse-connect/authentication/auth.service';

export class CryptoService {

    constructor(
        private auth: MuseAuthService
    ) {

    }

    public static encrypt(password) {
        console.log(password);
        const key = Utils.generateKey();

        localStorage.setItem('key', key);
        localStorage.setItem('password', cryptojs.AES.encrypt(password, key));
    }

    public static decrypt() {
        const password = localStorage.getItem('password');
        const authPassword = cryptojs.AES.decrypt(password.toString(), localStorage.getItem('key'));
        return authPassword.toString(cryptojs.enc.Utf8);
    }

    museConnectEncrypt(password): string {
        const key = Utils.generateKey();
        localStorage.setItem('password', cryptojs.AES.encrypt(password, key));
        return key;
    }

    museConnectDecrypt(): string {
        const password = cryptojs.AES.decrypt(
            localStorage.getItem('password').toString(),
            this.auth.user.key
        ).toString(cryptojs.enc.Utf8);
        return password;
    }

}

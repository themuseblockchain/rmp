// import { MuserService } from '../../core/services/muser.service';
import { Utils } from '../../core/utils';
import * as cryptojs from 'crypto-js';

export class CryptoService {
  public static encrypt(password) {
    // return new Promise(function (resolve, reject) {
      // this.muserService.getCurrentMuserAccount();
      const key = Utils.generateKey();
      localStorage.setItem('key', key);
      localStorage.setItem('password', cryptojs.AES.encrypt(password, key));
      // this.muserService.cast.subscribe(muserName => this.muser = muserName);
    // });
  }

  public static decrypt() {
      const password = localStorage.getItem('password');
      const authPassword = cryptojs.AES.decrypt(password.toString(), localStorage.getItem('key'));
      return authPassword.toString(cryptojs.enc.Utf8);
  }
}









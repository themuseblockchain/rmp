import * as cryptojs from 'crypto-js';
import { Utils } from '../../core/utils';
// import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
// import { MuserService } from '../../core/services/muser.service';

export class CryptoService {
    
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
}

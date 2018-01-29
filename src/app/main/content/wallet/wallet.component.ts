import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import * as muse from 'muse-js';
import {Observable} from 'rxjs/Rx';


@Component({
   selector: 'wallet',
   templateUrl: './wallet.component.html',
   styleUrls  : ['./wallet.component.scss']
})
export class Wallet implements OnInit, OnDestroy{

  Config: any;
  balance: any = 0;

   constructor(
     public dataService: DataService

   ) {
     this.dataService.setConfig();
     this.dataService.getAccount("johnstor5");
     // .subscribe(res => {
     //   let balance = res.map( => res.balance);
     //
     // });
     console.log();
       //this.load();
   }

   //ngOnInit() {

   //}

   //load() {
      // var UserName = "johnstor5";
      // localStorage.setItem('UserName', UserName);
      // //var UserName = localStorage.getItem('UserName');
      // //console.log(UserName);
      // muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
      // muse.api.getConfig(function(err, response){
      //    console.log(response);
      //  });
      //  muse.accountInfo(UserName, function(err, response, data)
      //  {
      //    //this.balance = data.balance;
      //    console.log(data);
      //    console.log(data.balance);
      //  });



     //this.dataService.getConfig();

     //this.dataService.getAccount('johnstor5');
     //this.dataService.getAccountHistory("johnstor5");
     //this.dataService.getUrlData("ipfs://here.here");
     //this.dataService.getDataForUser("gchampagne");
     //this.dataService.getContentorAll("");
     //this.dataService.getStreamingPlatforms("");
     //this.dataService.getAllAccounts();
     //this.dataService.authAccount("******","******");
   //}
}

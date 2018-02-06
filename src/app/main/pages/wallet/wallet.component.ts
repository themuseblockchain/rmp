import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
   selector: 'wallet',
   templateUrl: './wallet.component.html',
   styleUrls  : ['./wallet.component.scss']
})
export class WalletComponent implements OnInit
{
  muser: any;
  Config: any;
  balance: any = 0;
  walletForm: FormGroup;

   constructor(
                public dataService: DataService,
                private formBuilder: FormBuilder
                )
   {
    //  this.dataService.setConfig();
    //  this.dataService.getAccount('johnstor5');
     console.log();
      //  this.load();
   }

    ngOnInit()
    {
      this.walletForm = this.createUserForm();


    }

    createUserForm()
    {
        return this.formBuilder.group({
            // id              : [this.muser.id],
            Musebalance : [''],
            Vestbalance : [''],
            MBDbalance : [''],
            History : [''],
            tempValue : ['']

        });
    }


  //  load()
  //  {
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



     // this.dataService.getConfig();

     // this.dataService.getAccount('johnstor5');
     // this.dataService.getAccountHistory("johnstor5");
     // this.dataService.getUrlData("ipfs://here.here");
     // this.dataService.getDataForUser("gchampagne");
     // this.dataService.getContentorAll("");
     // this.dataService.getStreamingPlatforms("");
     // this.dataService.getAllAccounts();
     // this.dataService.authAccount("******","******");
  //  }
}

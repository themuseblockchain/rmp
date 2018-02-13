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
  balance = [];
  walletForm: FormGroup;

   constructor(
                private dataService: DataService,
                private formBuilder: FormBuilder
                )
   {


   }

    ngOnInit()
    {
      this.walletForm = this.createUserForm();
      this.load();




    }

    createUserForm()
    {
        return this.formBuilder.group({
            // id              : [this.muser.id],
            Musebalance : [''],
            Vestbalance : [''],
            MBDbalance : [''],
            NextwithDraw : [''],
            History : [''],
            tempValue : ['']

        });
    }


  load()
  {
    this.dataService.getAccount('johnstor5').then((result => {

      // this.Musebalance  = result[0].balance;
      // this.Vestbalance  = result[0].vesting_shares;
      // this.MBDbalance   = result[0].mbd_balance;
      // this.NextwithDraw = result[0].next_vesting.withdraw;
      console.log(result);
    }));

    // this.dataService.authAccount('johnstor5', '****').then((result => {
    //   console.log(result);
    // }));



      // muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
      // muse.api.getConfig(function(err, response){
      //    console.log(response);
      //  });
      // this.Musebalance = '2001';


     // this.dataService.getConfig();

     // this.dataService.getAccountHistory('johnstor5');
     // this.dataService.getAccountHistory("johnstor5");
     // this.dataService.getUrlData("ipfs://here.here");
     // this.dataService.getDataForUser("gchampagne");
     // this.dataService.getContentorAll("");
     // this.dataService.getStreamingPlatforms("");
     // this.dataService.getAllAccounts();
     // this.dataService.authAccount("******","******");
  }
}

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
  walletForm: FormGroup;
  Musebalance: any;
  Vestbalance: any;
  MBDbalance: any;
  NextwithDraw: any;
  History: any;
  tempValue: any;

   constructor(
                private dataService: DataService,
                private formBuilder: FormBuilder
                )
   {
     this.load();
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
            BasicKey : [''],
            ActiveKey : [''],
            OwnerKey : [''],
            MemoKey : [''],
            NextwithDraw : [''],
            History : [''],
            WitnessListArray : [''],
            tempValue : ['']
          });
    }

  load()
  {
    this.dataService.getAccount('johnstor5').then((result => {

      this.BasicKey = result[0].basic.key_auths[0][0];
      this.ActiveKey = result[0].active.key_auths[0][0];
      this.OwnerKey = result[0].owner.key_auths[0][0];
      this.MemoKey = result[0].memo_key;

      // console.log(this.MemoKey);

      this.Musebalance  = result[0].balance.split(' ')[0];
      this.Vestbalance  = result[0].vesting_shares.split(' ')[0];
      this.MBDbalance   = result[0].mbd_balance.split(' ')[0];
      this.NextwithDraw = result[0].next_vesting_withdrawal;
      // console.log(result);
    }));
    this.dataService.getAccountHistory('johnstor5').then((result => {
      this.History = result;
      // console.log(this.History);

    }));
    this.dataService.getWitnesses().then((result => {
      this.WitnessListArray = result;
      // console.log(result);
    }));
  }
  transferMuseBtn() {
    console.log('transfer!!');
  }

  vestMuseBtn() {
    console.log('vest!!!');
  }

  withdrawVestBtn() {
    console.log('withdraw!!');
  }

  cancelWithdrawBtn() {
    console.log('cancel!');
  }

}

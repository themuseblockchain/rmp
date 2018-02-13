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

      this.Musebalance  = result[0].balance.split(' ')[0];
      this.Vestbalance  = result[0].vesting_shares.split(' ')[0];
      this.MBDbalance   = result[0].mbd_balance.split(' ')[0];
      this.NextwithDraw = result[0].next_vesting_withdrawal;
      // console.log(result);
    }));
  }
}

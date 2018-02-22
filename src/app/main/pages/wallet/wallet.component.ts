import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
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
  BasicKey: any;
  ActiveKey: any;
  OwnerKey: any;
  MemoKey: any;
  WitnessListArray: any;
  tempValue: any;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ){}
  ngOnInit()
  {
    this.walletForm = this.createUserForm();
    this.loadData();
  }

  createUserForm()
  {
    return this.formBuilder.group({
      tempValue : ['']
    });
  }

  loadData()
  {
    this.dataService.getAccount('johnstor5').then((result => {
      this.BasicKey = result[0].basic.key_auths[0][0];
      this.ActiveKey = result[0].active.key_auths[0][0];
      this.OwnerKey = result[0].owner.key_auths[0][0];
      this.MemoKey = result[0].memo_key;
      this.Musebalance  = result[0].balance.split(' ')[0];
      this.Vestbalance  = result[0].vesting_shares.split(' ')[0];
      this.MBDbalance   = result[0].mbd_balance.split(' ')[0];
      this.NextwithDraw = result[0].next_vesting_withdrawal;
    }));
    this.dataService.getAccountHistory('johnstor5').then((result => {
      this.History = result;
    }));
    this.dataService.getWitnesses().then((result => {
      this.WitnessListArray = result;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalTransferComponent } from './modal/modal-transfer.component';
import { ModalDialogVestComponent } from './modal/modal-vest.component';
import { ModalWithdrawComponent } from './modal/modal-withdraw.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as cryptojs from 'crypto-js';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
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
  testing: '';
  dialogRefTrans: MatDialogRef<ModalTransferComponent>;
  dialogRefVest: MatDialogRef<ModalDialogVestComponent>;
  dialogRefWithd: MatDialogRef<ModalWithdrawComponent>;

  private authUser: any;
  private password: any;



  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.walletForm = this.createUserForm();
    this.loadData();
  }

  createUserForm() {
    return this.formBuilder.group({
      tempValue: ['']
    });
  }

  loadData() {
    this.authUser = localStorage.getItem('currentUser');
    this.dataService.getAccount(this.authUser).then((result => {
      this.BasicKey = result[0].basic.key_auths[0][0];
      this.ActiveKey = result[0].active.key_auths[0][0];
      this.OwnerKey = result[0].owner.key_auths[0][0];
      this.MemoKey = result[0].memo_key;
      this.Musebalance = result[0].balance.split(' ')[0];
      this.Vestbalance = result[0].vesting_shares.split(' ')[0];
      this.MBDbalance = result[0].mbd_balance.split(' ')[0];
      this.NextwithDraw = result[0].next_vesting_withdrawal;
    }));
    this.dataService.getAccountHistory(this.authUser).then((result => {
      this.History = result;
    }));
    this.dataService.getWitnesses().then((result => {
      this.WitnessListArray = result;
    }));
  }
  transferMuseBtn() {
    this.authUser = localStorage.getItem('currentUser');
    this.password = localStorage.getItem('password');

    const decrypt = cryptojs.AES.decrypt(this.password.toString(), this.authUser);
    const authKey = JSON.stringify(decrypt.toString(cryptojs.enc.Utf8));


    this.dialogRefTrans = this.dialog.open(ModalTransferComponent);
    this.dialogRefTrans.afterClosed().subscribe(
      data => this.dataService.transferMuse(this.authUser, authKey, data.transferto, data.amount, data.memo
      ));

    // trigger reload after success return and alert error if fails.
  }

  vestMuseBtn() {
    this.dialogRefVest = this.dialog.open(ModalDialogVestComponent);
    this.authUser = localStorage.getItem('currentUser');
    this.password = localStorage.getItem('password');

    const decrypt = cryptojs.AES.decrypt(this.password.toString(), this.authUser);
    const authKey = JSON.stringify(decrypt.toString(cryptojs.enc.Utf8));

    this.dialogRefVest.afterClosed().subscribe(
      data => this.dataService.transferMusetoVest(this.authUser, authKey, data
      ));
  }

  withdrawVestBtn() {
    this.dialogRefWithd = this.dialog.open(ModalWithdrawComponent);
    this.authUser = localStorage.getItem('currentUser');
    this.password = localStorage.getItem('password');

    const decrypt = cryptojs.AES.decrypt(this.password.toString(), this.authUser);
    const authKey = JSON.stringify(decrypt.toString(cryptojs.enc.Utf8));
    this.dialogRefWithd.afterClosed().subscribe(
      data => this.dataService.withdrawVesting(this.authUser, authKey, data
      ));
  }

  cancelWithdrawBtn() {
     this.dataService.withdrawVesting('johnstor5', '****', 0);
  }



}

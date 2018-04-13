import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalTransferComponent } from './modal/modal-transfer.component';
import { ModalDialogVestComponent } from './modal/modal-vest.component';
import { ModalWithdrawComponent } from './modal/modal-withdraw.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MuserService } from '../../core/services/muser.service';
import { CryptoService } from '../../core/services/crypto.service';


@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
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

  private muserName: any;
  private muserInfo: any;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private muserService: MuserService
  ) {
  }
  ngOnInit() {
    this.muserName = this.muserService.getMuserName;
    // this.dataService.getAccount(this.muserName)
    //   .then(data => this.loadData(data));

    this.dataService.getAccount$(this.muserName)
      .subscribe(data => this.loadData(data));

    this.muserInfo = this.dataService.streamAccountInfo$(this.muserName)
      .subscribe(data => this.loadData(data));

    this.walletForm = this.createUserForm();
  }

  createUserForm() {
    return this.formBuilder.group({
      tempValue: ['']
    });
  }

  loadData(data) {
    this.BasicKey = data[0].basic.key_auths[0][0];
    this.ActiveKey = data[0].active.key_auths[0][0];
    this.OwnerKey = data[0].owner.key_auths[0][0];
    this.MemoKey = data[0].memo_key;
    this.Musebalance = data[0].balance.split(' ')[0];
    this.Vestbalance = data[0].vesting_shares.split(' ')[0];
    this.MBDbalance = data[0].mbd_balance.split(' ')[0];
    this.NextwithDraw = data[0].next_vesting_withdrawal;

    this.dataService.getAccountHistory(this.muserName).then((result => {
      this.History = result;
    }));
    this.dataService.getWitnesses().then((result => {
      this.WitnessListArray = result;
    }));
  }
  transferMuseBtn() {
    const authPassword = CryptoService.decrypt();

    this.dialogRefTrans = this.dialog.open(ModalTransferComponent);
    this.dialogRefTrans.afterClosed().subscribe(
      data => this.dataService.transferMuse(this.muserName, authPassword, data.transferto, data.amount, data.memo
      ));
    // trigger reload after success return and alert error if fails.
  }

  vestMuseBtn() {
    this.dialogRefVest = this.dialog.open(ModalDialogVestComponent);
    const authPassword = CryptoService.decrypt();
    this.dialogRefVest.afterClosed().subscribe(
      data => this.dataService.transferMusetoVest(this.muserName, authPassword, data
      ));
  }

  withdrawVestBtn() {
    this.dialogRefWithd = this.dialog.open(ModalWithdrawComponent);
    const authPassword = CryptoService.decrypt();
    this.dialogRefWithd.afterClosed().subscribe(
      data => this.dataService.withdrawVesting(this.muserName, authPassword, data
      ));
  }

  cancelWithdrawBtn() {
    const authPassword = CryptoService.decrypt();
    this.dataService.withdrawVesting(this.muserName, authPassword, 0);
  }

  ngOnDestroy(): void {
    this.muserInfo.unsubscribe();
  }
}

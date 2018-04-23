import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { MuseService } from '../../core/services/muse.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalTransferComponent } from './modal/modal-transfer.component';
import { ModalDialogVestComponent } from './modal/modal-vest.component';
import { ModalWithdrawComponent } from './modal/modal-withdraw.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MuserService } from '../../core/services/muser.service';
import { CryptoService } from '../../core/services/crypto.service';
import { MuseAccount } from '../../core/modals/muse-account';


@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private muserService: MuserService,
    private museService: MuseService
  ) { }

  account: MuseAccount = new MuseAccount();
  WitnessListArray: any;
  dialogRefTrans: MatDialogRef<ModalTransferComponent>;
  dialogRefVest: MatDialogRef<ModalDialogVestComponent>;
  dialogRefWithd: MatDialogRef<ModalWithdrawComponent>;

  private muserName: any;

  ngOnInit() {

    // Get MuserName
    this.muserName = this.muserService.getMuserName;

    // Get Account Infos
    this.getAccount();
    this.getAccountHistory();
    this.getWitnesses();

  }

  getAccount(){

    // Get Initial Account Info
    this.museService.getAccount(this.muserName).then(response => {
      this.account.mapAccount(response[0]);
    });

    // Stream Account info for changes
    this.museService.streamAccountInfo$(this.muserName).subscribe(response => {
      this.account.mapAccount(response[0]);
      this.getAccountHistory();
    });

  }

  getAccountHistory(){

    this.museService.getAccountHistory(this.muserName).then(response => {
      this.account.history = response;
    });

  }

  getWitnesses(){
    this.museService.getWitnesses().then((result => {
      this.WitnessListArray = result;
    }));
  }

  transferMuseBtn() {
    const authPassword = CryptoService.decrypt();

    this.dialogRefTrans = this.dialog.open(ModalTransferComponent);
    this.dialogRefTrans.afterClosed().subscribe(data => this.museService.transferMuse(this.muserName, authPassword, data.transferto, data.amount, data.memo));
  }

  vestMuseBtn() {
    this.dialogRefVest = this.dialog.open(ModalDialogVestComponent);
    const authPassword = CryptoService.decrypt();
    this.dialogRefVest.afterClosed().subscribe(
      data => this.museService.transferMusetoVest(this.muserName, authPassword, data));
  }

  withdrawVestBtn() {
    this.dialogRefWithd = this.dialog.open(ModalWithdrawComponent);
    const authPassword = CryptoService.decrypt();
    this.dialogRefWithd.afterClosed().subscribe(
      data => this.museService.withdrawVesting(this.muserName, authPassword, data));
  }

  cancelWithdrawBtn() {
    const authPassword = CryptoService.decrypt();
    this.museService.withdrawVesting(this.muserName, authPassword, 0);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';

import { AlertService } from '../../core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { CoinMarketCapService } from '../../core/services/coin-market-cap.service';
import { CryptoService } from '../../core/services/crypto.service';
import { DataService } from '../../core/services/data.service';
import { MuseService } from '../../core/services/muse.service';
import { MuserService } from '../../core/services/muser.service';
import { UIService } from '../../core/services/ui.service';

import { ModalTransferComponent } from './modal/modal-transfer.component';
import { ModalDialogVestComponent } from './modal/modal-vest.component';
import { ModalWithdrawComponent } from './modal/modal-withdraw.component';

import { MuseAccountHistory } from '../../core/modals/muse-account-history';
import { MuseAccount } from '../../core/modals/muse-account';
import { MuseKeys } from '../../core/modals/muse-keys';
import { MuseWitness } from '../../core/modals/muse-witness';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private authService: AuthService,
    private coinMarketCapService: CoinMarketCapService,
    private fb: FormBuilder,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private muserService: MuserService,
    private museService: MuseService,
    // private router: Router,
    private ui: UIService
  ) {

    // Password Form
    this.passwordForm = fb.group({
      password: fb.control('', Validators.required),
      newPassword: fb.control('', Validators.required),
      understand: fb.control(null, Validators.required),
      saved: fb.control(null, Validators.required)
    });

  }

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorWitness') paginatorWitness: MatPaginator;

  muserName: any;
  passwordForm: FormGroup;
  account: MuseAccount = new MuseAccount();
  defaultDate: Date = new Date('1969-12-31T23:59:59');
  WitnessListArray: MuseWitness[] = [];
  generatedPassword: string;
  CurrentPass: string;
  marketCap: any;

  showPrivateBasic: boolean = false;
  showPrivateActive: boolean = false;
  showPrivateOwner: boolean = false;
  showPrivateMemo: boolean = false;

  dialogRefTrans: MatDialogRef<ModalTransferComponent>;
  dialogRefVest: MatDialogRef<ModalDialogVestComponent>;
  dialogRefWithd: MatDialogRef<ModalWithdrawComponent>;

  // Account History
  dataSource = new MatTableDataSource<MuseAccountHistory>(this.account.history);
  displayedColumnsHistory = ['date', 'transaction'];

  // Witness
  dataSourceWitness = new MatTableDataSource<MuseWitness>(this.WitnessListArray);
  displayedColumnsWitness = ['owner', 'block', 'url'];
  inputWitness: string;

  // Claim of Stake
  inputWIF: string;

  ngOnInit() {

    this.ui.showLoading();

    // Get MuserName
    this.muserName = this.muserService.getMuserName;

    // Get Account Infos
    this.getAccount();
    this.getAccountHistory();
    this.getWitnesses();
    this.getMarketCap();

  }

  getAccount() {

    // Get Initial Account Info
    this.museService.getAccount(this.muserName).then(response => {
      this.account.mapAccount(response[0]);
      this.ui.hideLoading();
    });

    // Stream Account info for changes
    this.museService.streamAccountInfo$(this.muserName).subscribe(response => {
      this.account.mapAccount(response[0]);
      this.getAccountHistory();
      this.ui.hideLoading();
    });

  }

  getAccountHistory() {
    this.museService.getAccountHistory(this.muserName).then((response: MuseAccountHistory[]) => {
      this.account.history = response;
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
    });
  }

  getWitnesses() {
    this.museService.getWitnesses().then(((result: any[]) => {
      result.forEach(res => {
        const witness: MuseWitness = new MuseWitness();
        witness.mapWitness(res);
        // this.WitnessListArray.push(witness);
        this.dataSourceWitness.data.push(witness);
      });
      this.dataSourceWitness.paginator = this.paginatorWitness;
    }));
  }

  getMarketCap() {
    this.coinMarketCapService.getMarketCap().subscribe(response => {
      this.marketCap = response[0];
    });
  }

  transferMuse() {

    const authPassword = CryptoService.decrypt();

    this.dialogRefTrans = this.dialog.open(ModalTransferComponent);
    this.dialogRefTrans.afterClosed().subscribe(data => {
      this.ui.showLoading();
      this.museService.transferMuse(this.muserName, authPassword, data.transferto, data.amount, data.memo);
    });
  }

  vestMuse() {
    this.dialogRefVest = this.dialog.open(ModalDialogVestComponent);
    const authPassword = CryptoService.decrypt();
    this.dialogRefVest.afterClosed().subscribe(data => {
      this.ui.showLoading();
      this.museService.transferMusetoVest(this.muserName, authPassword, data);
    });
  }

  withdrawVest() {
    this.dialogRefWithd = this.dialog.open(ModalWithdrawComponent);
    const authPassword = CryptoService.decrypt();
    this.dialogRefWithd.afterClosed().subscribe(data => {
      this.ui.showLoading();
      this.museService.withdrawVesting(this.muserName, authPassword, data);
    });
  }

  cancelWithdraw() {
    this.ui.showLoading();
    const authPassword = CryptoService.decrypt();
    this.museService.withdrawVesting(this.muserName, authPassword, 0);
  }

  generatePassword() {

    this.generatedPassword = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$%^&*()_+|~-={}[]:;?./';

    const tmpPwd: string[] = [];
    for (let i = 0; i < 52; i++) {
      tmpPwd.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }

    this.generatedPassword = tmpPwd.join('');

  }

  generatedPasswordMatch() {
    if (this.passwordForm.get('newPassword').value === this.generatedPassword) {
      return true;
    }
    this.passwordForm.get('newPassword').setErrors({ generatedPasswordMatch: true });
    return false;
  }

  updatePassword() {

    this.ui.showLoading();

    const truePassword: string = CryptoService.decrypt();
    const password: string = this.passwordForm.get('password').value;
    const newPassword: string = this.passwordForm.get('newPassword').value;

    let errors: boolean = false;

    if (password !== truePassword) {
      this.alert.showErrorMessage('auth/wrong-password');
      this.passwordForm.get('password').reset();
      errors = true;
      this.ui.hideLoading();
    }

    if (!errors) {

      // Get a set of new Keys based on the new generated password
      this.authService.getPrivateKeys(this.muserName, newPassword).then((keys: MuseKeys) => {

        // Update the actual keys with the new password
        this.authService.updateAccountKeys(this.muserName, password, newPassword, keys.ownerPubkey, keys.activePubkey, keys.basicPubkey, keys.memoPubkey)
          .then((response: boolean) => {
            this.ui.hideLoading();

            if (response) {
              this.generatedPassword = null;
              this.passwordForm.reset();              
            }

          });

      });

    }

  }

  loadPrivateKeys() {
    const password = CryptoService.decrypt();
    this.authService.getPrivateKeys(this.muserName, password).then((keys: MuseKeys) => {
      this.account.keys.basic = keys.basic;
      this.account.keys.active = keys.active;
      this.account.keys.owner = keys.owner;
      this.account.keys.memo = keys.memo;
    });
  }

  togglePrivatekeys(key: string) {

    if (key === 'basic') {
      if (!this.showPrivateBasic) {
        if (this.account.keys.basic === '') {
          this.loadPrivateKeys();
        }
        this.showPrivateBasic = true;
      } else {
        this.showPrivateBasic = false;
      }
    }

    if (key === 'active') {
      if (!this.showPrivateActive) {
        if (this.account.keys.active === '') {
          this.loadPrivateKeys();
        }
        this.showPrivateActive = true;
      } else {
        this.showPrivateActive = false;
      }
    }

    if (key === 'owner') {
      if (!this.showPrivateOwner) {
        if (this.account.keys.owner === '') {
          this.loadPrivateKeys();
        }
        this.showPrivateOwner = true;
      } else {
        this.showPrivateOwner = false;
      }
    }

    if (key === 'memo') {
      if (!this.showPrivateMemo) {
        if (this.account.keys.memo === '') {
          this.loadPrivateKeys();
        }
        this.showPrivateMemo = true;
      } else {
        this.showPrivateMemo = false;
      }
    }

  }

  voteWitness(witnessOwner: string, vote: boolean){
    console.log(vote);
    this.ui.showLoading();
    const password = CryptoService.decrypt();
    this.museService.voteWitness(this.muserName, password, witnessOwner, vote);
  }

  claimWIF(){
    this.ui.showLoading();
    this.museService.claimBalance(this.muserName, this.inputWIF); //ToDo: Check Muse-js library to figure source of current error
  }

}

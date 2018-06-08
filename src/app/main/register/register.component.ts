import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../core/common/route.animation';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../../core/services/auth.service';
// import { VerificationService } from '../../core/services/verification.service';

import { AlertService } from '../../core/services/alert.service';

import * as firebase from 'firebase';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TacComponent } from '../../main/components/modal/terms-conditions/tac.component';
import { AlertBtnText } from '../../core/enums';

import { LoadingOverlayComponent } from '../../core/loading-overlay/loading-overlay.component';
import { UIService } from '../../core/services/ui.service';
import { MuseAuthService } from '../../core/muse-connect/authentication/auth.service';
import { User } from '../../core/muse-connect/users/user';
import { CryptoService } from '../../core/services/crypto.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

  host: {
    '[@fadeInAnimation]': 'true'
  },

  animations: [fadeInAnimation]
})
export class RegisterComponent {

  constructor(
    private auth: MuseAuthService,
    private authService: AuthService,
    private alert: AlertService,
    private cryptoService: CryptoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public ui: UIService
  ) {

    // Build Form
    this.form = fb.group({
      muserName: fb.control('DominikG', Validators.required),
      email: fb.control('giroux.dominik@gmail.com', [Validators.required, Validators.email]),
      password: fb.control('s86T61k6', Validators.required),
      passwordConfirm: fb.control('s86T61k6', Validators.required),
      terms: fb.control(true, Validators.required),
      ackLoss: fb.control(true, Validators.required),
      ackPw: fb.control(true, Validators.required)
    });

  }

  form: FormGroup;

  // ngOnInit() {
  //   //  this.alert.showEmailVerifiedMessageAndRedirect();
  // }

  register() {

    this.authService.createAccount(this.form.get('muserName').value, this.form.get('password').value, this.form.get('email').value);
    
    // .then(() => {
    //     this.router.navigateByUrl('/login');
    //     this.authService.authAccount(this.muserName.toLowerCase(), this.password).then(() => {
    //       this.isAuthenticated = localStorage.getItem('isAuthenticated');
    //       if (this.isAuthenticated === 'true') {
    //         this.router.navigateByUrl('/');
    //       }
    //     }).catch((err) => {
    //       this.alert.showErrorMessage('register(): ' + err);
    //     });

    //   });
  }

  termsAndCond() {
    this.dialog.open(TacComponent, {
      disableClose: true,
      data: {
        title: 'Terms and Conditions',
        message: '\<p>\<b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n',
        btnEnd: AlertBtnText.Close
      }
    });

  }
  passwordMatch() {
    if (this.form.get('password').value === this.form.get('passwordConfirm').value) {
      return true;
    }
    this.form.get('passwordConfirm').setErrors({ MatchPassword: true });
    return false;
  }

  registerMuseConnect(){

    const user = new User();
    user.email = this.form.get('email').value;
    user.musername = this.form.get('muserName').value;
    user.password = this.form.get('password').value;
    user.key = this.cryptoService.museConnectEncrypt(this.form.get('password').value);
    this.auth.register(user);

  }

}

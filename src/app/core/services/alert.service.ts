import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

// import { Validator } from '../validator';
import { AlertComponent } from '../../main/components/alert/alert.component';
import { AlertBtnText } from '../../core/enums/alert-btn-text.enums';
import { ErrorCodes } from '../../core/enums/error-codes.enums';

const errorMessages = {
  // Firebase Error Messages
  accountExistsWithDifferentCredential: { title: 'Account Exists!', message: 'An account with the same credential already exists.' },
  invalidCredential: { title: 'Invalid Credential!', message: 'An error occured logging in with this credential.' },
  operationNotAllowed: { title: 'Login Failed!', message: 'Logging in with this provider is not allowed! Please contact support.' },
  userDisabled: { title: 'Account Disabled!', message: 'Sorry! This account has been suspended! Please contact support.' },
  userNotFound: { title: 'Account Not Found!', message: 'Sorry, an account with this credential could not be found.' },
  wrongPassword: { title: 'Incorrect Password!', message: 'Sorry, the password you have entered is incorrect.' },
  invalidEmail: { title: 'Invalid Email!', message: 'Sorry, you have entered an invalid email address.' },
  emailAlreadyInUse: { title: 'Email Not Available!', message: 'Sorry, this email is already in use.' },
  weakPassword: { title: 'Weak Password!', message: 'Sorry, you have entered a weak password.' },
  providerAlreadyLinked: { title: 'Already Linked!', message: 'Sorry, your account is already linked to this credential.' },
  credentialAlreadyInUse: { title: 'Credential Not Available!', message: 'Sorry, this credential is already used by another user.' },
  muserNameAlreadyInUse: { title: 'Muser Name Not Available!', message: 'Sorry, this Muser Name is already in use.' },
  muserNotFound: { title: 'Account Not Found!', message: 'Sorry, an account with this Muser Name could not be found.' },
  invalidContentForm: { title: 'Missing required field/s!', message: 'Please make sure all required fields are completed.' },
  // Catch all error
  default: { title: 'Error', message: 'Please contact support with the following error message: ' }
};

const successMessages = {
  emailVerified: { title: 'Email Confirmed!', message: 'Congratulations! Your email has been confirmed!' },
  emailVerificationSent: { title: 'Email Confirmation Sent!', message: 'Please confirm your email sent to ' },
  passwordChanged: { title: 'Password Changed!', message: 'Your password has been successfully changed.' },

  // Catch all Success
  default: { title: 'Success', message: '' }

};


@Injectable()
export class AlertService {
  constructor(private dialog: MatDialog) { }

  showEmailVerificationSentMessage(email) {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        title: successMessages.emailVerificationSent['title'],
        message: successMessages.emailVerificationSent['message'] + email + ' before continuing.'
        // btnStart: AlertBtnText.UpdateEmail,
        // btnEnd: AlertBtnText.ResendEmail
      }
    });

  }

  showEmailVerified() {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        title: successMessages.emailVerified['title'],
        message: successMessages.emailVerified['message'],
        btnEnd: AlertBtnText.OK
      }
    });
  }

  showSuccessMessage(title: string, message: string) {
    this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        title: title,
        message: message,
        btnEnd: AlertBtnText.OK
      }
    });
  }

  // Show error messages depending on the code
  // If you added custom error codes on top, make sure to add a case block for it.
  showErrorMessage(code) {
    switch (code) {
      // Firebase Error Messages
      case ErrorCodes.emailAlreadyInUse:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.emailAlreadyInUse['title'],
            message: errorMessages.emailAlreadyInUse['message'],
            btnEnd: AlertBtnText.OK
          }
        });
        break;
      case ErrorCodes.muserNameAlreadyInUse:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.muserNameAlreadyInUse['title'],
            message: errorMessages.muserNameAlreadyInUse['message'],
            btnEnd: AlertBtnText.OK
          }
        });
        break;
      case ErrorCodes.muserNameNotFound:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.muserNotFound['title'],
            message: errorMessages.muserNotFound['message'],
            btnEnd: AlertBtnText.OK
          }
        });
        break;
      case ErrorCodes.wrongPassword:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.wrongPassword['title'],
            message: errorMessages.wrongPassword['message'],
            btnEnd: AlertBtnText.OK
          }
        });
        break;
        case ErrorCodes.invalidContentForm:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.invalidContentForm['title'],
            message: errorMessages.invalidContentForm['message'],
            btnEnd: AlertBtnText.OK
          }
        });
        break;
        
        case ErrorCodes.invalidTesterKey:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.invalidCredential['title'],
            message: errorMessages.invalidCredential['message'],
            btnEnd: AlertBtnText.OK
          }
        });
        break;

      default:
        this.dialog.open(AlertComponent, {
          disableClose: true,
          data: {
            title: errorMessages.default['title'],
            message: errorMessages.default['message'] + code,
            btnEnd: AlertBtnText.OK
          }
        });

    }
  }

  closeAll() {
    this.dialog.closeAll();
  }
}

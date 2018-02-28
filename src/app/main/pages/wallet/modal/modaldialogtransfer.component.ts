import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material';
// import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'modal-dialog-transfer',
  templateUrl: './modaldialogtransfer.component.html'
})

export class ModalDialogTransferComponent {

  transferMuseAct() {
    DataService.museConfig();
    console.log('works!');
  }

}

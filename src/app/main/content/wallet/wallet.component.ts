import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
   selector: 'wallet',
   templateUrl: './wallet.component.html',
   styleUrls  : ['./wallet.component.scss']
})
export class Wallet{

onInit(){

   }

   constructor( public dataService: DataService
   ) {
       this.load();
   }

   load() {
     this.dataService.setConfig();
     this.dataService.getConfig();
     this.dataService.getAccount("johnstor5");
     this.dataService.getAccountHistory("johnstor5");
     //this.dataService.getUrlData("ipfs://here.here");
     //this.dataService.getDataForUser("gchampagne");
     //this.dataService.getContentorAll("");
     //this.dataService.getStreamingPlatforms("");
     //this.dataService.getAllAccounts();
     this.dataService.authAccount("******","******");
   }
}

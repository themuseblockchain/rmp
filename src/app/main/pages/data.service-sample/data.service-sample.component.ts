import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
   selector: 'dataService-sample',
   templateUrl: './data.service-sample.component.html',
   styleUrls  : ['./data.service-sample.component.scss']
})
export class DataServiceSampleComponent{

onInit(){

   }

   constructor( public dataService: DataService
   ) {
       this.load();
   }

   load() {
     this.dataService.setConfig();
     this.dataService.getConfig();
     // this.dataService.getAccount("johnstor5");
     // this.dataService.getUrlData("ipfs://here.here");
     // this.dataService.getDataForUser("gchampagne");
     // this.dataService.getContentorAll("");
     // this.dataService.getStreamingPlatforms("");
     // this.dataService.getAllAccounts();
     this.dataService.authAccount('******', '******');
   }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
   selector: 'another-sample',
   templateUrl: './another-sample.component.html',
   styleUrls  : ['./another-sample.component.scss']
})
export class AnotherSampleComponent{

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
     this.dataService.getUrlData("ipfs://here.here");
     this.dataService.getDataForUser("gchampagne");
     this.dataService.getContentorAll("");
     this.dataService.getStreamingPlatforms("");
     this.dataService.getAllAccounts();
   }
}

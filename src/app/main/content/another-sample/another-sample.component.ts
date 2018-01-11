import { Component, OnInit } from '@angular/core';
//import { DataService } from '../../../core/services/data.service';
import * as muse from 'muse-js';

@Component({
   selector: 'another-sample',
   templateUrl: './another-sample.component.html',
   styleUrls  : ['./another-sample.component.scss']
})
export class AnotherSampleComponent{

onInit(){

   }

   constructor( //public dataService: DataService
   ) {
       this.load();

       console.log("Works?");
   }

   load() {
    muse.api.getConfig(function(err,response){console.log(response)});
    console.log("Works?");
    muse.api.getAccounts(['test', 'test2'], function(err, response){
      console.log(err, response);
    });
   }
}

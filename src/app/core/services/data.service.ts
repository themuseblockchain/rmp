import { Injectable, Inject } from '@angular/core';
import * as Muse from 'muse-js';
@Injectable()
export class DataService
{
constructor(public muse: Muse)
{

}
//init()
//{
  //console.log(this.muse);
  //alert('muse obj: ' + JSON.stringify(this.muse));
  //this.muse.config.set('websocket','wss://api.muse.blckchnd.com');
  //this.muse.api.getConfig(function(err,response){console.log(response)});
//}
}

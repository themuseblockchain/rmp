import { Injectable, Inject } from '@angular/core';
import * as Muse from 'museblockchain-js/dist/muse.min.js';
@Injectable()
export class DataService
{
constructor(@Inject(Muse) public muse: Muse){}

init()
{

//this.muse.config.set('websocket','wss://api.muse.blckchnd.com');
//this.muse.api.getConfig(function(err,response){console.log(response)});
}
}

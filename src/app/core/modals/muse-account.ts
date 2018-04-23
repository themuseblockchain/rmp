import { MuseAccountHistory } from './muse-account-history';

export class MuseAccount {

    constructor(){
        this.history = [];
    }

    BasicKey: string;
    ActiveKey: string;
    OwnerKey: string;
    MemoKey: string;    
    Musebalance: string;
    Vestbalance: string;
    MBDbalance: string;
    NextwithDraw: Date;
    history: MuseAccountHistory[];

    mapAccount(museAccount: any){
        // console.log(museAccount); // museAccount object from blockchain - Uncomment to view all properties
        this.BasicKey = museAccount.basic.key_auths[0][0];
        this.ActiveKey = museAccount.active.key_auths[0][0];
        this.OwnerKey = museAccount.owner.key_auths[0][0];
        this.MemoKey = museAccount.memo_key;
        this.Musebalance = museAccount.balance.split(' ')[0];
        this.Vestbalance = museAccount.vesting_shares.split(' ')[0];
        this.MBDbalance = museAccount.mbd_balance.split(' ')[0];
        this.NextwithDraw = museAccount.next_vesting_withdrawal;
    }

}

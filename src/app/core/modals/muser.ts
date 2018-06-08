import { Roles } from './roles';

export class Muser {

    constructor() {
        this.roles = new Roles();
    }

    muserName: string;
    dateAdded: string;
    email: string;
    emailVerified: boolean;
    pin: number;
    roles: Roles;
    uid: string;

}

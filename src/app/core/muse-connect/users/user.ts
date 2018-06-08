export class User {

    constructor(id?: string, musername?: string, email?: string, password?: string, key?: string) {
        id ? this.id = id : this.id = null;
        musername ? this.musername = musername : this.musername = '';
        email ? this.email = email : this.email = '';
        password ? this.password = password : this.password = null;
        key ? this.key = key : this.key = null;
    }

    id: string;
    musername: string;
    email: string;
    password: string;
    key: string;

}

/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
export class User {
    public active: boolean;
    public password: string;
    constructor(public mobile?: number, public username?: string, public dni?: string, public email?: string, public address?: string) {
        this.active = true;
        this.password = "client_password";
    }
}
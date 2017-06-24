/**
 * Created by fran lopez on 02/05/2017.
 */

export const MOBILE_ATTRIBUTE_NAME: string = 'mobile';
export const DNI_ATTRIBUTE_NAME: string = 'dni';
export const EMAIL_ATTRIBUTE_NAME: string = 'email';
export const ID_ATTRIBUTE_NAME: string = 'id';
export const USERNAME_ATTRIBUTE_NAME: string = 'username';

export class User {
    constructor(public mobile?: number, public password?: string, public dni?: string, public email?: string,
                public username?: string, public address?: string, public active?: boolean, public id?: number) {
    }

    equals(user: User): boolean {
        return ((user.mobile === this.mobile) && (user.password === this.password) && (user.dni === this.dni)
        && (user.email === this.email) && (user.username === this.username) && (user.address === this.address)
        && (user.active === this.active))
    }
}
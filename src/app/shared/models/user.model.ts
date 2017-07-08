/**
 * Created by fran lopez on 02/05/2017.
 */

export const MOBILE_ATTRIBUTE_NAME = 'mobile';
export const DNI_ATTRIBUTE_NAME = 'dni';
export const EMAIL_ATTRIBUTE_NAME = 'email';
export const USERNAME_ATTRIBUTE_NAME = 'username';
export const IDENTIFICATION_ATTRIBUTE_NAME = 'identification';

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
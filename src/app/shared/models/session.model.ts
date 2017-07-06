/**
 * @author Fran lopez
 * Github: https://github.com/fclopezjurado
 *
 * @author Sergio Banegas Cortijo
 * Github: https://github.com/sergiobanegas
 */

import {ROLE_ADMIN, ROLE_MANAGER, ROLE_OPERATOR} from '../../app.config';
export const ROLE_ATTRIBUTE_NAME = 'role';

export class Session {
    constructor(public token: string, public role: string) {
    }

    hasPrivileges(): boolean {
        return this.role === ROLE_ADMIN || this.role === ROLE_MANAGER || this.role === ROLE_OPERATOR;
    }
}
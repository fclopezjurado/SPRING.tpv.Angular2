/**
 * Created by fran lopez on 11/05/2017.
 */

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {LOCAL_STORAGE_TOKEN_ATTRIBUTE, ROLE_ADMIN} from '../app.config';
import {Session} from '../shared/models/session.model';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private localStorageService: LocalStorageService) {
    }

    canActivate(): boolean {
        if (this.localStorageService.isStored(LOCAL_STORAGE_TOKEN_ATTRIBUTE)) {
            let sessionString: string = this.localStorageService.getItem(
                LOCAL_STORAGE_TOKEN_ATTRIBUTE);
            let parsedSession = JSON.parse(sessionString);
            let session = new Session(parsedSession.token, parsedSession.rol);

            return (session.role === ROLE_ADMIN);
        }

        return false;
    }
}

/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

    private authorizationSubject: Subject<boolean> = new Subject<boolean>();

    reportUnauthorized(): void {
        this.authorizationSubject.next(false);
    }

    getAuthorizationObservable(): Observable<boolean> {
        return this.authorizationSubject.asObservable();
    }

}
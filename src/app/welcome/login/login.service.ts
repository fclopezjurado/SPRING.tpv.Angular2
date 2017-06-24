/**
 * Created by fran lopez on 04/05/2017.
 */

import {Injectable}    from '@angular/core';
import {Headers} from '@angular/http';
import {Session} from '../../shared/models/session.model';
import {API_GENERIC_URI} from '../../app.config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HTTPService} from '../../shared/services/http.service';

@Injectable()
export class LoginService {
    private endpoint: string =  '/tokens';

    constructor(private httpService: HTTPService) {
    }

    login(mobile: number, password: string): Observable<Session> {
        let headers = new Headers({
            'Authorization': 'Basic ' + btoa(mobile + ':' + password)
        });

        return this.httpService.post(this.endpoint, null, headers);
    }
}
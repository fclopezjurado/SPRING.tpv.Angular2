/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';

import { LOCAL_STORAGE_TOKEN_ATTRIBUTE } from '../app.config';

import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable()
export class HomeService {

    constructor(private localStorageService: LocalStorageService) { }

    logout() {
        this.localStorageService.removeItem(LOCAL_STORAGE_TOKEN_ATTRIBUTE);
    }

}
/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed, async, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('Component: LocalStorageService', () => {

    let tpv_key: string = 'tpv-test';
    let tpv_value: string = 'testing';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [LocalStorageService]
        });
    }));

    it(`Should work with localStorage properly`, inject([LocalStorageService], (localStorageService: LocalStorageService) => {
        localStorageService.setItem(tpv_key, tpv_value);
        let item: string = JSON.parse(localStorageService.getItem(tpv_key));
        expect(item).toBe(tpv_value);
        localStorageService.removeItem(tpv_key);
        item = localStorageService.getItem(tpv_key);
        expect(item).toBeNull();
    }));

});

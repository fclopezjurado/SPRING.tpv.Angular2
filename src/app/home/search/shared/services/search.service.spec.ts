/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { Category } from '../models/category.model';
import { SearchService } from './search.service';
import { HTTPService } from '../../../../shared/services/http.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

export const MockCategoriesPage = {
    content: [],
    last: false,
    number: 0
}

describe('Service: SearchService', () => {

    let searchService: SearchService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule,
                FlexLayoutModule,
                MaterialModule
            ],
            providers: [
                SearchService,
                MockBackend,
                BaseRequestOptions,
                HTTPService,
                LocalStorageService,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
        searchService = TestBed.get(SearchService);
    }));

    it(`Should add the new category to the categoriesRoute list when 'getCategoryContent() is called`, inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockCategoriesPage) })));
        });
        let category: Category = new Category(1234, 'categoryTest', null, null);
        searchService.getCategoryContent(category).then(() => {
            expect(searchService.isRootCategory()).toBeFalsy();
        });
    }));

    it(`Should pop the last category of categoriesRoute when 'goToPreviousCategory() is called`, inject([MockBackend], (mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(MockCategoriesPage) })));
        });
        searchService.goToPreviousCategory().then(() => {
            expect(searchService.isRootCategory()).toBeTruthy();
        });
    }));

});

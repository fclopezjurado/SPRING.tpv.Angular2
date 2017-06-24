/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HTTPService } from './http.service';
import { LocalStorageService } from './local-storage.service';

describe('Service: HTTPService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                HTTPService,
                LocalStorageService,
                { provide: XHRBackend, useClass: MockBackend },
                MockBackend
            ]
        });
    });

    it(`'requestGet()' should return an Observable<any>`,
        inject([HTTPService, MockBackend], (httpService, mockBackend) => {
            const mockResponse = {
                data: [
                    { id: 0, code: 'article0' },
                    { id: 1, code: 'article1' },
                    { id: 2, code: 'article2' },
                    { id: 3, code: 'article3' },
                ]
            };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            httpService.get('/products').subscribe(products => {
                expect(products.length).toBe(4);
                expect(products[0].code).toEqual('CODE1');
                expect(products[1].code).toEqual('CODE2');
                expect(products[2].code).toEqual('CODE3');
                expect(products[3].code).toEqual('CODE4');
            });
        }));

    it(`'requestPost()' should return an Observable<any>`,
        inject([HTTPService, MockBackend], (httpService: HTTPService, mockBackend: MockBackend) => {
            const mockResponse = {
                data: [
                    { id: 0, code: 'article0' },
                    { id: 1, code: 'article1' },
                    { id: 2, code: 'article2' },
                    { id: 3, code: 'article3' },
                ]
            };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            let postValue: Object = { id: 0, name: 'article0' };
            httpService.post('/products', postValue).subscribe(product => {
                expect(product).not.toBeNull();
                expect(product.code).toEqual('article0');
                expect(product.id).toEqual(0);
            });
        }));

    it(`'requestUpdate()' should return an Observable<any>`,
        inject([HTTPService, MockBackend], (httpService: HTTPService, mockBackend: MockBackend) => {
            const mockResponse = {
                data: [
                    { id: 0, code: 'article0' },
                    { id: 1, code: 'article1' },
                    { id: 2, code: 'article2' },
                    { id: 3, code: 'article3' },
                ]
            };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            let updateValue = { id: 0, name: 'article4' };
            httpService.put('/products/0', updateValue).subscribe(product => {
                expect(product).not.toBeNull();
                expect(product.code).toEqual('article4');
                expect(product.id).toEqual(0);
            });
        }));

    it(`'requestDelete()' should return an Observable<any>`,
        inject([HTTPService, MockBackend], (httpService: HTTPService, mockBackend: MockBackend) => {
            const mockResponse = {
                data: [
                    { id: 0, code: 'article0' },
                    { id: 1, code: 'article1' },
                    { id: 2, code: 'article2' },
                    { id: 3, code: 'article3' }
                ]
            };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            let updateValue = { id: 0, name: 'article3' };
            httpService.delete('/products/0').subscribe(response => {
                expect(response).not.toBeNull();
            });
        }));

});
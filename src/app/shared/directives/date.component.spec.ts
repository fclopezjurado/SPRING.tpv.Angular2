/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';

describe('Component: DateComponent', () => {

    let dateComponent: DateComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DateComponent]
        });
        let fixture = TestBed.createComponent(DateComponent);
        dateComponent = fixture.componentInstance;
    });

    it(`Date should update`, () => {
        let date1: Date = dateComponent.date;
        setTimeout(() => {
            let date2: Date = dateComponent.date;
            expect(date1).not.toBe(date2);
        }, 1000);
    });

});

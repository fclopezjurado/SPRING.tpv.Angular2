/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CalculatorComponent } from './calculator.component';

describe('Component: CalculatorComponent', () => {

    let calculator;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, FlexLayoutModule],
            declarations: [CalculatorComponent]
        });
        let fixture: any = TestBed.createComponent(CalculatorComponent);
        calculator = fixture.componentInstance;
    }));

    it(`Should start with a '0' in the result`, () => {
        expect(calculator.result).toBe('0');
    });

    it(`Should set the firstValue as '2' when 'setValue(2)' is called`, () => {
        calculator.setValue('2');
        expect(calculator.firstValue).toBe('2');
    });

    it(`Should set the '+' operator`, () => {
        calculator.setOperator('+');
        expect(calculator.currentOperator).toBe('+');
    });

    it(`Should set the secondValue as '5' when 'setValue(5)' is called`, () => {
        calculator.setValue('2');
        calculator.setOperator('+');
        calculator.setValue('5');
        expect(calculator.secondValue).toBe('5');
    });

    it(`Should make the operation when 'calculate()' is called`, () => {
        calculator.setValue('2');
        calculator.setOperator('+');
        calculator.setValue('5');
        calculator.calculate();
        expect(calculator.result).toBe('7');
    });

    it(`Should add a decimal when 'setDecimals()' is called`, () => {
        calculator.setValue('2');
        calculator.setDecimals();
        calculator.setValue('55');
        expect(calculator.firstValue).toBe('2.55');
    });

    it(`Should reset the result when 'reset()' is called`, () => {
        calculator.reset();
        expect(calculator.result).toBe('0');
    });

});

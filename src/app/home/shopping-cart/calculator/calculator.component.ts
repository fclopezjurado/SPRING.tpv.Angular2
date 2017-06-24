/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'calculator-view',
    templateUrl: './calculator.component.html',
    styles: [`
        b {
            font-size: 200%;
        }

        div > div > div {
            padding: 0.5em;
        }
    `]
})

export class CalculatorComponent implements OnInit {

    currentOperator: string = null;
    firstValue: string = '';
    secondValue: string = '';
    result: string = '0';
    decimalsActivated: boolean = false;

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.currentOperator = null;
        this.firstValue = '';
        this.secondValue = '';
        this.result = '0';
        this.decimalsActivated = false;
    }

    setValue(number) {
        this.currentOperator == '=' && this.reset();
        if (this.currentOperator == null) {
            this.firstValue = this.firstValue + number;
            this.result = this.firstValue;
        } else {
            this.secondValue = this.secondValue + number;
            this.result = this.secondValue;
        }
    }

    setOperator(operator) {
        this.currentOperator != null && this.calculate();
        this.currentOperator = operator;
    }

    setDecimals() {
        if (this.currentOperator == null && this.firstValue.indexOf('.') == -1) {
            this.firstValue += '.';
            this.decimalsActivated = true;
        } else if (this.secondValue.indexOf('.') == -1) {
            this.secondValue += '.';
            this.decimalsActivated = true;
        }
    }

    calculate() {
        switch (this.currentOperator) {
            case '+':
                this.firstValue = (Number(this.firstValue) + Number(this.secondValue)).toString();
                break;
            case '-':
                this.firstValue = (Number(this.firstValue) - Number(this.secondValue)).toString();;
                break;
            case '*':
                this.firstValue = (Number(this.firstValue) * Number(this.secondValue)).toString();;
                break;
            case '/':
                this.firstValue = (Number(this.firstValue) / Number(this.secondValue)).toString();;
                break;
            default:
                break;
        }
        this.secondValue = '';
        this.result = this.firstValue;
        this.decimalsActivated = false;
        this.currentOperator = '=';
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.preventDefault();
        let key: string = event.key;
        key == "Enter" && this.calculate();
        key == 'a' && this.reset();
        key == '.' && this.setDecimals();
        (Number(key) > -1 && Number(key) < 10) && this.setValue(Number(key));
        (key == '+' || key == '-' || key == '*' || key == '/') && this.setOperator(key);
    }

}

/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { element, by } from 'protractor';

export class CalculatorView {

    clickNumber(number: number) {
        return element(by.id(`number-${number}-button`)).click();
    }

    clickSumButton() {
        return element(by.id('sum-button')).click();
    }

    clickDecimalsButton() {
        return element(by.id('decimals-button')).click();
    }

    clickCalculateButton() {
        return element(by.id('calculate-button')).click();
    }

    getResultText() {
        return element(by.id('calculator-result')).getText();
    }

}
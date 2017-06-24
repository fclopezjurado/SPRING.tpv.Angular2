/**
 * Created by fran lopez on 14/05/2017.
 */

import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl} from '@angular/forms';

@Injectable()
export class RegExpFormValidatorService {
    public regExpFormValidator(regExpression: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const valueToValidate = control.value;
            const isValid = regExpression.test(valueToValidate);
            return isValid ? null : {'invalid': {valueToValidate}};
        };
    }
}
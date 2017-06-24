/**
 * Created by fran lopez on 30/05/2017.
 */

import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'bool_to_string'})
export class BooleanToStringPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'yes' : 'no';
    }
}
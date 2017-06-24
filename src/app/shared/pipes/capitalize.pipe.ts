/**
  * @author Fran López
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    transform(value: string, words: boolean): string {
        if (value) {
            return words
                ? value.replace(/\b\w/g, first => first.toLocaleUpperCase())
                : value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
}
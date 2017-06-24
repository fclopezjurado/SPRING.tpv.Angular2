/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Category } from './category.model';

export class CategoriesPage {
    constructor(public content: Category[], public number: number, public last: boolean) { }
}
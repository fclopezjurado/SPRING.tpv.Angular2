/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { browser, element, by } from 'protractor';

export class SearchView {

    fillForm(name: string) {
        element(by.id('name-input')).sendKeys(name);
        element(by.id('submit-search-button')).click();
    }

    getSearchResultsText() {
        return element(by.id('search-results-container')).getText();
    }

}
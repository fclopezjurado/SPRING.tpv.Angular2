/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas
*/
import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { Category } from './shared/models/category.model';
import { CategoriesPage } from './shared/models/categories-page.model';
import { SearchService } from './shared/services/search.service';
import { ShoppingService } from '../shared/services/shopping.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'search-view',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    categories: Category[] = [];
    categoriesPageSubcription: Subscription;
    nameInput: string;
    lastNameInput: string;
    pxScrolled: number = 0;
    @ViewChild('scrollContainer') scrollContainer: ElementRef;
    lastPage: CategoriesPage;
    isRootCategory: boolean = true;
    scrolled: boolean = false;
    loading: boolean = true;
    containerPosition: number;
    breadcrumb: string = this.searchService.getBreadcrumb();

    constructor(private searchService: SearchService, private shoppingService: ShoppingService, private toastService: ToastService, private dialog: MdDialog) { }

    ngOnInit() {
        this.categoriesPageSubcription = this.searchService.getCategoriesPageObservable().subscribe((categoriesPage: CategoriesPage) => {
            this.categories = this.scrolled
                ? this.categories.concat(categoriesPage.content)
                : categoriesPage.content;
            this.scrolled = this.loading = false;
            this.lastPage = categoriesPage;
            this.isRootCategory = this.searchService.isRootCategory();
            this.breadcrumb = this.searchService.getBreadcrumb();
        });
        this.searchService.getCategoryContent();
        this.containerPosition = window.innerHeight - this.scrollContainer.nativeElement.offsetTop - 16;
    }

    openCategory(category: Category): void {
        if (category.code) {
            let dialogRef: MdDialogRef<ProductDetailsComponent> = this.dialog.open(ProductDetailsComponent);
            dialogRef.componentInstance.initialize(category.code);
        } else {
            this.loading = true;
            this.searchService.getCategoryContent(category);
        }
    }

    goToPreviousCategory(): void {
        this.loading = true;
        this.searchService.goToPreviousCategory();
    }

    search(event: any): void {
        event.preventDefault();
        this.loading = true;
        this.nameInput && this.searchService.search(this.nameInput).then((categoriesPage: CategoriesPage) => {
            this.lastNameInput = this.nameInput;
            this.nameInput = undefined;
        });
    }

    @HostListener('window:scroll', [])
    scrollHandler(event: any): void {
        let tracker: Element = event.target;
        let limit: number = tracker.scrollHeight - tracker.clientHeight;
        this.pxScrolled = event.target.scrollTop;
        if (tracker.scrollTop === limit && !this.lastPage.last) {
            this.scrolled = true;
            this.lastNameInput
                ? this.searchService.search(this.lastNameInput, this.lastPage.number + 1)
                : this.searchService.getCategoryContent(null, this.lastPage.number + 1);
        }
    }

    resetSearch(): void {
        this.lastNameInput = this.lastPage = undefined;
        this.loading = true;
        this.scrolled = false;
        this.searchService.getCategoryContent();
    }

    addToCart(code: string): void {
        this.shoppingService.addProduct(code).then(() => {
            this.toastService.info('Product added', 'The product has been added to the shopping cart');
        }).catch((error: string) => {
            this.toastService.error('Error adding product', error);
        });
    }

    scrollToTop(): void {
        this.scrollContainer.nativeElement.scrollTop = 0;
    }

    getFloatingButtonsTopPx(): number {
        return this.pxScrolled + 5;
    }

    getCategoryBackgroundColor(code: string): string {
        return code ? '#E1F5FE' : '#FFF9C4';
    }

    ngOnDestroy() {
        this.categoriesPageSubcription && this.categoriesPageSubcription.unsubscribe();
    }

}

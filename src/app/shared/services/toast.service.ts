/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class ToastService {

    private toastOptions: ToastOptions = {
        title: 'title',
        msg: 'message',
        showClose: true,
        theme: 'default'
    };

    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'default';
    }

    info(title: string, message: string): void {
        this.setOptions(title, message);
        this.toastyService.info(this.toastOptions);
    }

    success(title: string, message: string): void {
        this.setOptions(title, message);
        this.toastyService.success(this.toastOptions);
    }

    error(title: string, message: string): void {
        this.setOptions(title, message);
        this.toastyService.error(this.toastOptions);
    }

    private setOptions(title: string, message: string): void {
        this.toastOptions.title = title;
        this.toastOptions.msg = message;
    }

}
/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        return localStorage.getItem(key);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    isStored(key: string): boolean {
        return (this.getItem(key) !== null);
    }
}
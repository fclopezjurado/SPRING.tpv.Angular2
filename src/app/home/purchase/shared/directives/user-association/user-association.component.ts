/**
  * @author Sergio Banegas Cortijo
  * Github: https://github.com/sergiobanegas 
*/
import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';

import { UserService } from './user.service';

import { User } from '../../../../shared/models/user.model';
import { ShoppingService } from '../../../../shared/services/shopping.service';
import { ToastService } from '../../../../../shared/services/toast.service';

@Component({
    selector: 'user-association-view',
    templateUrl: './user-association.component.html',
    styles: [`
        #disassociate-user-button, #new-client-button {
            position: absolute;
            right: 0px;
            top: 0px;
        }
        
        @media only screen and (min-width: 960px) {
            #button-container > button {
                width: 50%;
            }
        }
  `]
})
export class UserAssociationComponent {

    userAssociated: User;
    mobileNumberInput: number;
    newClientOpened: boolean = false;
    newUserInput: User = new User();

    constructor(private shoppingService: ShoppingService, private userService: UserService, private toastService: ToastService, private dialog: MdDialog) { }

    associate(event: Event): void {
        event.preventDefault();
        this.shoppingService.associateUser(this.mobileNumberInput).then((userAssociated: User) => {
            this.mobileNumberInput = null;
            this.userAssociated = userAssociated;
            this.toastService.success('Client asociated', `The client with the mobile ${userAssociated.mobile} has been associated`);
        }).catch((error: string) => {
            this.toastService.error('Error associating the client', error);
        });
    }

    disassociate(): void {
        this.toastService.info('Client dissasociated', `The client with the mobile ${this.mobileNumberInput} has been disassociated`);
        this.shoppingService.disassociateUser();
        this.userAssociated = null;
    }

    openNewClient(): void {
        this.newClientOpened = true;
    }

    cancelNewClient(): void {
        this.newClientOpened = false;
        this.newUserInput = new User();
    }

    newUser(event: Event): void {
        event.preventDefault();
        this.userService.newUser(this.newUserInput).then(() => {
            this.shoppingService.associateUser(this.newUserInput.mobile).then((user: User) => {
                this.toastService.success('Client created', `The client with the mobile ${user.mobile} has been created`);
                this.userAssociated = user;
                this.newClientOpened = false;
            }).catch((error: string) => {
                this.toastService.error('Error associating the client created', error);
            });
            this.newUserInput = new User();
        }).catch((error: string) => {
            this.toastService.error('Error creating the client', error);
        });
    }

    closeNewClient(): void {
        this.newClientOpened = false;
    }

    formatMobileNumberInput(): void {
        if (this.mobileNumberInput < 0) {
            this.mobileNumberInput = undefined;
        }
    }

    formatNewUserMobileNumberInput(): void {
        if (this.newUserInput.mobile < 0) {
            this.newUserInput.mobile = undefined;
        }
    }

}

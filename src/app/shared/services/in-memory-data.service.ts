/**
 * Created by fran lopez on 14/05/2017.
 */

import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let customers = [
            {
                id: 600000000,
                mobile: 600000000,
                username: 'customer1',
                dni: '66666666A',
                email: 'customer1@gmail.com',
                address: 'address1',
                password: 'password1',
                active: true
            },
            {
                id: 600000001,
                mobile: 600000001,
                username: 'customer2',
                dni: '66666666B',
                email: 'customer2@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000002,
                mobile: 600000002,
                username: 'customer3',
                dni: '66666666C',
                email: 'customer3@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000003,
                mobile: 600000003,
                username: 'customer4',
                dni: '66666666D',
                email: 'customer4@gmail.com',
                address: 'address3',
                password: 'password3',
                active: true
            },
            {
                id: 600000004,
                mobile: 600000004,
                username: 'customer5',
                dni: '66666666E',
                email: 'customer5@gmail.com',
                address: 'address4',
                password: 'password4',
                active: false
            },
            {
                id: 600000005,
                mobile: 600000005,
                username: 'customer6',
                dni: '66666666F',
                email: 'customer6@gmail.com',
                address: 'address5',
                password: 'password5',
                active: true
            },
            {
                id: 600000006,
                mobile: 600000006,
                username: 'customer7',
                dni: '66666666G',
                email: 'customer7@gmail.com',
                address: 'address6',
                password: 'password6',
                active: true
            },
            {
                id: 600000007,
                mobile: 600000007,
                username: 'customer8',
                dni: '66666666H',
                email: 'customer8@gmail.com',
                address: 'address7',
                password: 'password7',
                active: true
            },
            {
                id: 600000008,
                mobile: 600000008,
                username: 'customer9',
                dni: '66666666I',
                email: 'customer9@gmail.com',
                address: 'address8',
                password: 'password8',
                active: true
            },
            {
                id: 600000009,
                mobile: 600000009,
                username: 'customer10',
                dni: '66666666J',
                email: 'customer10@gmail.com',
                address: 'address9',
                password: 'password9',
                active: true
            },
            {
                id: 600000010,
                mobile: 600000010,
                username: 'customer11',
                dni: '66666666K',
                email: 'customer11@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000011,
                mobile: 600000011,
                username: 'customer12',
                dni: '66666666L',
                email: 'customer12@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000012,
                mobile: 600000012,
                username: 'customer13',
                dni: '66666666M',
                email: 'customer13@gmail.com',
                address: 'address11',
                password: 'password11',
                active: true
            },
            {
                id: 600000013,
                mobile: 600000013,
                username: 'customer14',
                dni: '66666666N',
                email: 'customer14@gmail.com',
                address: 'address12',
                password: 'password12',
                active: true
            },
            {
                id: 600000014,
                mobile: 600000014,
                username: 'customer15',
                dni: '66666666O',
                email: 'customer15@gmail.com',
                address: 'address13',
                password: 'password13',
                active: true
            },
            {
                id: 600000015,
                mobile: 600000015,
                username: 'customer16',
                dni: '66666666P',
                email: 'customer16@gmail.com',
                address: 'address14',
                password: 'password14',
                active: true
            },
        ];
        let operators = [
            {
                id: 600000000,
                mobile: 600000000,
                username: 'operator1',
                dni: '66666666A',
                email: 'operator1@gmail.com',
                address: 'address1',
                password: 'password1',
                active: true
            },
            {
                id: 600000001,
                mobile: 600000001,
                username: 'operator2',
                dni: '66666666B',
                email: 'operator2@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000002,
                mobile: 600000002,
                username: 'operator3',
                dni: '66666666C',
                email: 'operator3@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000003,
                mobile: 600000003,
                username: 'operator4',
                dni: '66666666D',
                email: 'operator4@gmail.com',
                address: 'address3',
                password: 'password3',
                active: true
            },
            {
                id: 600000004,
                mobile: 600000004,
                username: 'operator5',
                dni: '66666666E',
                email: 'operator5@gmail.com',
                address: 'address4',
                password: 'password4',
                active: false
            },
            {
                id: 600000005,
                mobile: 600000005,
                username: 'operator6',
                dni: '66666666F',
                email: 'operator6@gmail.com',
                address: 'address5',
                password: 'password5',
                active: true
            },
            {
                id: 600000006,
                mobile: 600000006,
                username: 'operator7',
                dni: '66666666G',
                email: 'operator7@gmail.com',
                address: 'address6',
                password: 'password6',
                active: true
            },
            {
                id: 600000007,
                mobile: 600000007,
                username: 'operator8',
                dni: '66666666H',
                email: 'operator8@gmail.com',
                address: 'address7',
                password: 'password7',
                active: true
            },
            {
                id: 600000008,
                mobile: 600000008,
                username: 'operator9',
                dni: '66666666I',
                email: 'operator9@gmail.com',
                address: 'address8',
                password: 'password8',
                active: true
            },
            {
                id: 600000009,
                mobile: 600000009,
                username: 'operator10',
                dni: '66666666J',
                email: 'operator10@gmail.com',
                address: 'address9',
                password: 'password9',
                active: true
            },
            {
                id: 600000010,
                mobile: 600000010,
                username: 'operator11',
                dni: '66666666K',
                email: 'operator11@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000011,
                mobile: 600000011,
                username: 'operator12',
                dni: '66666666L',
                email: 'operator12@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000012,
                mobile: 600000012,
                username: 'operator13',
                dni: '66666666M',
                email: 'operator13@gmail.com',
                address: 'address11',
                password: 'password11',
                active: true
            },
            {
                id: 600000013,
                mobile: 600000013,
                username: 'operator14',
                dni: '66666666N',
                email: 'operator14@gmail.com',
                address: 'address12',
                password: 'password12',
                active: true
            },
            {
                id: 600000014,
                mobile: 600000014,
                username: 'operator15',
                dni: '66666666O',
                email: 'operator15@gmail.com',
                address: 'address13',
                password: 'password13',
                active: true
            },
            {
                id: 600000015,
                mobile: 600000015,
                username: 'operator16',
                dni: '66666666P',
                email: 'operator16@gmail.com',
                address: 'address14',
                password: 'password14',
                active: true
            },
        ];
        let managers = [
            {
                id: 600000000,
                mobile: 600000000,
                username: 'manager1',
                dni: '66666666A',
                email: 'manager1@gmail.com',
                address: 'address1',
                password: 'password1',
                active: true
            },
            {
                id: 600000001,
                mobile: 600000001,
                username: 'manager2',
                dni: '66666666B',
                email: 'manager2@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000002,
                mobile: 600000002,
                username: 'manager3',
                dni: '66666666C',
                email: 'manager3@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000003,
                mobile: 600000003,
                username: 'manager4',
                dni: '66666666D',
                email: 'manager4@gmail.com',
                address: 'address3',
                password: 'password3',
                active: true
            },
            {
                id: 600000004,
                mobile: 600000004,
                username: 'manager5',
                dni: '66666666E',
                email: 'manager5@gmail.com',
                address: 'address4',
                password: 'password4',
                active: false
            },
            {
                id: 600000005,
                mobile: 600000005,
                username: 'manager6',
                dni: '66666666F',
                email: 'manager6@gmail.com',
                address: 'address5',
                password: 'password5',
                active: true
            },
            {
                id: 600000006,
                mobile: 600000006,
                username: 'manager7',
                dni: '66666666G',
                email: 'manager7@gmail.com',
                address: 'address6',
                password: 'password6',
                active: true
            },
            {
                id: 600000007,
                mobile: 600000007,
                username: 'manager8',
                dni: '66666666H',
                email: 'manager8@gmail.com',
                address: 'address7',
                password: 'password7',
                active: true
            },
            {
                id: 600000008,
                mobile: 600000008,
                username: 'manager9',
                dni: '66666666I',
                email: 'manager9@gmail.com',
                address: 'address8',
                password: 'password8',
                active: true
            },
            {
                id: 600000009,
                mobile: 600000009,
                username: 'manager10',
                dni: '66666666J',
                email: 'manager10@gmail.com',
                address: 'address9',
                password: 'password9',
                active: true
            },
            {
                id: 600000010,
                mobile: 600000010,
                username: 'manager11',
                dni: '66666666K',
                email: 'manager11@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000011,
                mobile: 600000011,
                username: 'manager12',
                dni: '66666666L',
                email: 'manager12@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000012,
                mobile: 600000012,
                username: 'manager13',
                dni: '66666666M',
                email: 'manager13@gmail.com',
                address: 'address11',
                password: 'password11',
                active: true
            },
            {
                id: 600000013,
                mobile: 600000013,
                username: 'manager14',
                dni: '66666666N',
                email: 'manager14@gmail.com',
                address: 'address12',
                password: 'password12',
                active: true
            },
            {
                id: 600000014,
                mobile: 600000014,
                username: 'manager15',
                dni: '66666666O',
                email: 'manager15@gmail.com',
                address: 'address13',
                password: 'password13',
                active: true
            },
            {
                id: 600000015,
                mobile: 600000015,
                username: 'manager16',
                dni: '66666666P',
                email: 'manager16@gmail.com',
                address: 'address14',
                password: 'password14',
                active: true
            },
        ];
        let tickets = [
            {
                id: 1,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000000
            },
            {
                id: 2,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000000
            },
            {
                id: 3,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000000
            },
            {
                id: 4,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000001
            },
            {
                id: 5,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000001
            },
            {
                id: 6,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000001
            },
            {
                id: 7,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000002
            },
            {
                id: 8,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000002
            },
            {
                id: 9,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000002
            },
            {
                id: 10,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000003
            },
            {
                id: 11,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000003
            },
            {
                id: 12,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000003
            },
            {
                id: 13,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000004
            },
            {
                id: 14,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000004
            },
            {
                id: 15,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000004
            },
            {
                id: 16,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000005
            },
            {
                id: 17,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000005
            },
            {
                id: 18,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000005
            },
            {
                id: 19,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000006
            },
            {
                id: 20,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000007
            },
            {
                id: 21,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000008
            },
            {
                id: 22,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000009
            },
            {
                id: 23,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000009
            },
            {
                id: 24,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000009
            },
            {
                id: 24,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000010
            },
            {
                id: 25,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000010
            },
            {
                id: 26,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000010
            },
            {
                id: 27,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000011
            },
            {
                id: 28,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000011
            },
            {
                id: 29,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000011
            },
            {
                id: 30,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000012
            },
            {
                id: 31,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000012
            },
            {
                id: 32,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000012
            },
            {
                id: 33,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000013
            },
            {
                id: 34,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000013
            },
            {
                id: 35,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000013
            },
            {
                id: 36,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000014
            },
            {
                id: 37,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000014
            },
            {
                id: 38,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000014
            },
            {
                id: 39,
                created: "12/12/2016",
                reference: "dsfa23df1sa1f3da",
                user: 600000015
            },
            {
                id: 40,
                created: "11/12/2016",
                reference: "dsf923df1sa1f3da",
                user: 600000015
            },
            {
                id: 41,
                created: "10/12/2016",
                reference: "dsfb23df1sa1f3da",
                user: 600000015
            }];
        let users = [
            {
                id: 600000000,
                mobile: 600000000,
                username: 'manager1',
                dni: '66666666A',
                email: 'manager1@gmail.com',
                address: 'address1',
                password: 'password1',
                active: true
            },
            {
                id: 600000001,
                mobile: 600000001,
                username: 'manager2',
                dni: '66666666B',
                email: 'manager2@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000002,
                mobile: 600000002,
                username: 'manager3',
                dni: '66666666C',
                email: 'manager3@gmail.com',
                address: 'address2',
                password: 'password2',
                active: false
            },
            {
                id: 600000003,
                mobile: 600000003,
                username: 'manager4',
                dni: '66666666D',
                email: 'manager4@gmail.com',
                address: 'address3',
                password: 'password3',
                active: true
            },
            {
                id: 600000004,
                mobile: 600000004,
                username: 'manager5',
                dni: '66666666E',
                email: 'manager5@gmail.com',
                address: 'address4',
                password: 'password4',
                active: false
            },
            {
                id: 600000005,
                mobile: 600000005,
                username: 'manager6',
                dni: '66666666F',
                email: 'manager6@gmail.com',
                address: 'address5',
                password: 'password5',
                active: true
            },
            {
                id: 600000006,
                mobile: 600000006,
                username: 'manager7',
                dni: '66666666G',
                email: 'manager7@gmail.com',
                address: 'address6',
                password: 'password6',
                active: true
            },
            {
                id: 600000007,
                mobile: 600000007,
                username: 'manager8',
                dni: '66666666H',
                email: 'manager8@gmail.com',
                address: 'address7',
                password: 'password7',
                active: true
            },
            {
                id: 600000008,
                mobile: 600000008,
                username: 'manager9',
                dni: '66666666I',
                email: 'manager9@gmail.com',
                address: 'address8',
                password: 'password8',
                active: true
            },
            {
                id: 600000009,
                mobile: 600000009,
                username: 'manager10',
                dni: '66666666J',
                email: 'manager10@gmail.com',
                address: 'address9',
                password: 'password9',
                active: true
            },
            {
                id: 600000010,
                mobile: 600000010,
                username: 'manager11',
                dni: '66666666K',
                email: 'manager11@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000011,
                mobile: 600000011,
                username: 'manager12',
                dni: '66666666L',
                email: 'manager12@gmail.com',
                address: 'address10',
                password: 'password10',
                active: true
            },
            {
                id: 600000012,
                mobile: 600000012,
                username: 'manager13',
                dni: '66666666M',
                email: 'manager13@gmail.com',
                address: 'address11',
                password: 'password11',
                active: true
            },
            {
                id: 600000013,
                mobile: 600000013,
                username: 'manager14',
                dni: '66666666N',
                email: 'manager14@gmail.com',
                address: 'address12',
                password: 'password12',
                active: true
            },
            {
                id: 600000014,
                mobile: 600000014,
                username: 'manager15',
                dni: '66666666O',
                email: 'manager15@gmail.com',
                address: 'address13',
                password: 'password13',
                active: true
            },
            {
                id: 600000015,
                mobile: 600000015,
                username: 'manager16',
                dni: '66666666P',
                email: 'manager16@gmail.com',
                address: 'address14',
                password: 'password14',
                active: true
            },
        ];
        let shoppings = [
            {
                id: 1,
                amount: 2,
                discount: 3,
                description: 'description1',
                price: 25.2,
                state: 'OPENED',
                code: 'dfasd2fa3',
                ticket: 1
            },
            {
                id: 2,
                amount: 3,
                discount: 4,
                description: 'description2',
                price: 37.6,
                state: 'CLOSED',
                code: 'zaf7sd845a646',
                ticket: 1
            },
            {
                id: 3,
                amount: 4,
                discount: 13,
                description: 'description3',
                price: 19.4,
                state: 'STARTED',
                code: 'fgsdf5g64sdf6',
                ticket: 1
            },
            {
                id: 4,
                amount: 2,
                discount: 3,
                description: 'description1',
                price: 25.2,
                state: 'OPENED',
                code: 'dfasd2fa3',
                ticket: 2
            },
            {
                id: 5,
                amount: 3,
                discount: 4,
                description: 'description2',
                price: 37.6,
                state: 'CLOSED',
                code: 'zaf7sd845a646',
                ticket: 2
            },
            {
                id: 6,
                amount: 4,
                discount: 13,
                description: 'description3',
                price: 19.4,
                state: 'STARTED',
                code: 'fgsdf5g64sdf6',
                ticket: 2
            },
            {
                id: 7,
                amount: 2,
                discount: 3,
                description: 'description1',
                price: 25.2,
                state: 'OPENED',
                code: 'dfasd2fa3',
                ticket: 3
            },
            {
                id: 8,
                amount: 3,
                discount: 4,
                description: 'description2',
                price: 37.6,
                state: 'CLOSED',
                code: 'zaf7sd845a646',
                ticket: 3
            },
            {
                id: 9,
                amount: 4,
                discount: 13,
                description: 'description3',
                price: 19.4,
                state: 'STARTED',
                code: 'fgsdf5g64sdf6',
                ticket: 3
            },
            {
                id: 10,
                amount: 2,
                discount: 3,
                description: 'description1',
                price: 25.2,
                state: 'OPENED',
                code: 'dfasd2fa3',
                ticket: 4
            },
            {
                id: 11,
                amount: 3,
                discount: 4,
                description: 'description2',
                price: 37.6,
                state: 'CLOSED',
                code: 'zaf7sd845a646',
                ticket: 4
            },
            {
                id: 12,
                amount: 4,
                discount: 13,
                description: 'description3',
                price: 19.4,
                state: 'STARTED',
                code: 'fgsdf5g64sdf6',
                ticket: 4
            }];
        let shopping_states = [
            {
                id: 1,
                state: 'OPENED'
            },
            {
                id: 2,
                state: 'STARTED'
            },
            {
                id: 3,
                state: 'CLOSED'
            },
            {
                id: 4,
                state: 'COMMITED'
            }
        ];
        return {customers, operators, managers, tickets, users, shoppings, shopping_states};
    }
}
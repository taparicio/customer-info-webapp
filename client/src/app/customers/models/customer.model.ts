export class Customer {

    _id?: string;
    firstName: string;
    surName: string;
    phoneNumber?: string;
    address?: string;
    status: string;
    creationDateTime: Date;
    notes: Array<String>;

    constructor() {
        this.firstName = '';
        this.surName = '';
        this.phoneNumber = '';
        this.address = '';
        this.creationDateTime = new Date();
        this.status = '';
        this.notes = [];
    }

}

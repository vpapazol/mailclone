export class ContactClass {
    public _id: string;
    public fullName: string;
    public avatarUrl: string;
    public birthdate: string;
    public address: string;
    public email: string;

    constructor(i, n, u, b, a, e) {
            this._id = i;
            this.fullName = n;
            this.avatarUrl = u;
            this.birthdate = b;
            this.address = a;
            this.email = e;
        }
 }

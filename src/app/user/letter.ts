export class LetterClass {
    public _id: string;
    public to: string;
    public subject: string;
    public body: string;
    public mailbox: string;

    constructor(i, t, s, b, m) {
            this._id = i;
            this.to = t;
            this.subject = s;
            this.body = b;
            this.mailbox = m;
        }
 }

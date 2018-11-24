export class User {
    id: Number;
    email: string;
    lastName: string;
    firstName: string;
    address: string;
    password: string;
    phone: string;
    role: Number = 0;
    sex: string;
    error: string;

    toString(): string {
        return 'lastName='||this.lastName||', firstName='||this.firstName||', e-mail='||this.email;
    }
}

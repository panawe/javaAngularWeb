import {User} from './User';
export class Reservation {
    id: Number;
    rating: Number = 0;
    status: Number = 0;
    comment: string;
    feedback: string;
    nbrRooms: Number;
    cost: Number;
    reservationDate: Date;
    user: User;
    error:string;
}

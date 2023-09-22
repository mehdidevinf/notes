
import { User } from './user';

export interface Login {
    success:string;
    token:string;
    user: User;
}

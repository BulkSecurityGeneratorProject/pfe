import { IUser } from 'app/core/user/user.model';

export interface IUserInfo {
    id?: number;
    companyName?: string;
    user?: IUser;
}

export class UserInfo implements IUserInfo {
    constructor(public id?: number, public companyName?: string, public user?: IUser) {}
}

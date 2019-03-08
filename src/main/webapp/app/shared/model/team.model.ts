import { IChannel } from 'app/shared/model/channel.model';
import { IUser } from 'app/core/user/user.model';

export interface ITeam {
    id?: number;
    teamName?: string;
    channels?: IChannel[];
    users?: IUser[];
}

export class Team implements ITeam {
    constructor(public id?: number, public teamName?: string, public channels?: IChannel[], public users?: IUser[]) {}
}

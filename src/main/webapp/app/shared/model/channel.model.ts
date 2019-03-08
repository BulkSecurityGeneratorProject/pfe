import { ITeam } from 'app/shared/model/team.model';
import { IMessage } from 'app/shared/model/message.model';

export interface IChannel {
    id?: number;
    channelName?: string;
    team?: ITeam;
    messages?: IMessage[];
}

export class Channel implements IChannel {
    constructor(public id?: number, public channelName?: string, public team?: ITeam, public messages?: IMessage[]) {}
}

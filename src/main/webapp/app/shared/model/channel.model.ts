import { ITeam } from 'app/shared/model/team.model';
import { IMessage } from 'app/shared/model/message.model';
import { ISource } from 'app/shared/model/source.model';

export interface IChannel {
    id?: number;
    channelName?: string;
    domain?: string;
    team?: ITeam;
    messages?: IMessage[];
    source?: ISource;
}

export class Channel implements IChannel {
    constructor(
        public id?: number,
        public channelName?: string,
        public domain?: string,
        public team?: ITeam,
        public messages?: IMessage[],
        public source?: ISource
    ) {}
}

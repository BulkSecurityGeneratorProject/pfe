import { Moment } from 'moment';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { IChannel } from 'app/shared/model/channel.model';
import { IUser } from 'app/core/user/user.model';

export interface IMessage {
    id?: number;
    messageTitle?: string;
    messageText?: string;
    archived?: boolean;
    createdAt?: Moment;
    annotations?: IAnnotation[];
    channel?: IChannel;
    user?: IUser;
}

export class Message implements IMessage {
    constructor(
        public id?: number,
        public messageTitle?: string,
        public messageText?: string,
        public archived?: boolean,
        public createdAt?: Moment,
        public annotations?: IAnnotation[],
        public channel?: IChannel,
        public user?: IUser
    ) {
        this.archived = this.archived || false;
    }
}

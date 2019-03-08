import { IMessage } from 'app/shared/model/message.model';

export interface IAnnotation {
    id?: number;
    annotationType?: number;
    annotationData?: string;
    message?: IMessage;
}

export class Annotation implements IAnnotation {
    constructor(public id?: number, public annotationType?: number, public annotationData?: string, public message?: IMessage) {}
}

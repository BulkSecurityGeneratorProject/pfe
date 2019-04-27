export interface IAnnotationGrouped {
    a: {
        data?: string;
        nb?: number;
    };
}
export class AnnotationGrouped implements IAnnotationGrouped {
    constructor(public a) {}
}

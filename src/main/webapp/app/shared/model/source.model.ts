export interface ISource {
    id?: number;
    logoUrl?: string;
    name?: string;
}

export class Source implements ISource {
    constructor(public id?: number, public logoUrl?: string, public name?: string) {}
}

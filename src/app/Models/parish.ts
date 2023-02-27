export class Parish{
    _id: string;
    parishName:string;

    constructor(_id?: string, parishName?: string){
        this._id = _id!;
        this.parishName = parishName!;
    }
}
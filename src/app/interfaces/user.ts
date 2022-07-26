

export interface UserI {
    uid?:string;
    email:string;
    pass:string;
    name?:string;
    photo?:string;
    emailverified?:boolean;
    statut:number;
}

export class User implements UserI{
    uid?:string;
    email='';
    pass='';
    name?:string;
    photo?:string;
    emailverified?:boolean;
    statut=0;

}


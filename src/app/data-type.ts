export interface SignUp{
    name:string;
    password:string;
    email:string;
}

export interface Login{
    email:String;
    password:String;
}

export interface product {
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id: number
}
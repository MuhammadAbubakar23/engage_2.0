export interface Users {
    id?:string;
    fullName?:string;
    firstName:string;
    lastName: string;
    image?:string;
    phone?:any;
    email:string ;
    password?:string ;
    confirmPassword?:string;
    role:[];
    team?:[];
    company?:number;   
}

export class ConsoleTableHeader {
    visible: boolean = true; 
    index:[] = [];
    name: string = ""; 
    type: string = "empty"; 
    order:string | boolean = false; 
    search:string | boolean = false; 
    group:number | boolean = false; 
    actions:[]| boolean = false; 
    wrap:string = "";
    icon:string = "";
}

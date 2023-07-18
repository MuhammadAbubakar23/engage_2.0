import { ConsoleTableHeader } from "./console-table-header";

export class ConsoleTableParams 
{
    search: string | boolean = false;
    url: string = "";
    urlParams: string  = "";
    pageno: number=1;
    pagesize: number = 50;
    template: any = {
        "toolbar": "top",
        "refresh":true 
    };
    headers: ConsoleTableHeader[] = [];

}

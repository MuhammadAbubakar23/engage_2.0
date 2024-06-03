export class ChannelRule{
    platform:string="";
    rulesWihtCount:RuleWithCount=new RuleWithCount()
}
export class RuleWithCount{
    TotalCount:number=0;
    Rules:Rule[]=[]
}
export class Rule{
        id: number=0;
        name: string="";
        description:string= "";
        companyId: number=0;
        rulesJson:string= "";
        tableName: string="";
        coloumnName: string="";
        condition: string="";
        value: string="";
        parentId: number=0;
        groupId: number=0;
        createdDate: Date=new Date()
        status: boolean = false;  // Add this line
}
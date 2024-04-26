export class DispositionFormDto {
    disposition: number = 0;
    reasonId: number = 0;
    customerProfileId:number = 0;
    comment:string = '';
    follow_Up_Date:any = null;
    wings:string='';
    completedData: CompletedDataDto = new CompletedDataDto();
    groupId:any[]=[];
  }

  export class CompletedDataDto {
    user: string = '';
    plateFrom: string = '';
    userId: number = 0;
    companyId:number = 0;
    LastQueryId:number=0;
  }
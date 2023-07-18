export class DispositionFormDto {
    dispositionId: number = 0;
    reasonId: number = 0;
    customerProfileId:number = 0;
    comment:string = '';
    completedData: CompletedDataDto = new CompletedDataDto();
  }

  export class CompletedDataDto {
    user: string = '';
    plateFrom: string = '';
    userId: number = 0;
    companyId:number = 0;
  }
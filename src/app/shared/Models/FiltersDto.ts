export class FiltersDto {
  fromDate?: any;
  toDate?: any;
  user: string="";
  pageId: string="";
  plateForm: string="";
  pageNumber : number=0;
  pageSize : number=0;
  isAttachment : boolean = false;
  queryType : string = "";
  text:string="";
  userName:string="";
  notInclude:String="";
  include:String="";
  flag:String="";
  wings:String="";
  hasBlueTick:boolean=false;
  skills:string[]=[];
  }
export class FiltersDtolocal {
  fromDate?: any;
  toDate?: any;
  user: string = "";
  pageId: string = "";
  plateForm: string = "";
  pageNumber: number = 0;
  pageSize: number = 0;
  isAttachment: boolean = false;
  hasBlueTick: boolean = false;
  queryType: string = "";
  text: string = "";
  userName: string = "";
  notInclude: String = "";
  include: String = "";
  flag: String = "";
  wings: String = "";
  skills:string[]=[];
}

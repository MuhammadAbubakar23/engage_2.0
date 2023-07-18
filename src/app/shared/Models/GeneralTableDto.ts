export class GeneralTableDto<T> {
  IsSelected: boolean = false;
  Id: number = 0;
  Name: string = "";
  SubName: string = "";
  ImgName: string = "";
  GroupA: Array<T> = [];
  GroupB: Array<T> = [];
  BtnList: Array<T> = [];
}
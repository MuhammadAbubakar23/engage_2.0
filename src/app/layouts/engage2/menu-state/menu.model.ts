export interface MenuModel {
    mainId:number,
    name: string,
    emerging:string,
    slug:string,
    link:string,
    parentId:number,
    baseId:number,
    icon:string,
    indexNo:number,
    type?:string,
    typeId?:number,
    subMenu?:MenuModel[],
    isSelected:boolean,
    isDisabled:boolean
}
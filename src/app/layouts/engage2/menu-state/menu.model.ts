export interface MenuModel {
    mainId:number,
    normalizedName?:string,
    name: string,
    emerging:string,
    slug:string,
    link:string,
    desc:string,
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
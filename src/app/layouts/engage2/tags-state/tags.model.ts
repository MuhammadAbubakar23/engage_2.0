export interface TagsModel {
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
    subTags?:TagsModel[],
    isSelected:boolean,
    isDisabled:boolean
}
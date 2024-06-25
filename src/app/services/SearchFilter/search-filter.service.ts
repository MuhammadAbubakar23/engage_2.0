import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  constructor() { }

  private _userName: string = '';
  private _user: string = '';
  private _text: string = '';
  private _include: string = '';
  private _notInclude: string = '';
  private _fromDate: any;
  private _toDate:any;
  private _isAttachment: any = false;
  private _blueTick:any = false;

  
  get userNameFilter(): string {
    return this._userName;
  }

  setUserNameFilter(value: any) {
    this._userName = value;
  }

  get userFilter(): string {
    return this._user;
  }

  setUserFilter(value: string) {
    this._user = value;
  }

  get textFilter(): string {
    return this._text;
  }

  setTextFilter(value: string) {
    this._text = value;
  }

  get includeFilter(): string {
    return this._include;
  }

  setIncludeFilter(value: string) {
    this._include = value;
  }

  get notIncludeFilter(): string {
    return this._notInclude;
  }

  setNotIncludeFilter(value: string) {
    this._notInclude = value;
  }

  get fromDateFilter(): any { 
    return this._fromDate;
  }

  setfromDateFilter(value: any) {
    this._fromDate = value;
  }

  get toDateFilter(): any {
    return this._toDate;
  }

  setToDateFilter(value:any) {
    this._toDate  = value;
  }


  get isAttachmentFilter(): any {
    return this._isAttachment;
  }

  setisAttachmentFilter(value: any) {
    this._isAttachment = value;
  }
  
  get blueTick():any {
    return this._blueTick;
  }

  setBlueTick(value:any) {
    this._blueTick = value;
  }

  resetAllFilter(): void {
    this._userName = '';
    this._user = '';
    this._text = '';
    this._include = '';
    this._notInclude = '';
    this._fromDate = null;
    this._toDate = null;
    this._isAttachment = false;
    this._blueTick = false
  }
}
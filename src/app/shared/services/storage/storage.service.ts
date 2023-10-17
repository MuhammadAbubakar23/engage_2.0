import { Injectable } from '@angular/core';
import { CookieStorageService } from './cookie.storage.service';
import { LocalStorageService } from './local.storage.service';
import { SessionStorageService } from './session.storage.service';
import  *  as CryptoJS from  'crypto-js';
import { EnvService } from '../env/env.service';
//import { GenericService } from '../generic/generic.service';
//import { MessagingService } from '../messaging/messaging.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService { //extends GenericService { //  extends LocalStorageService
  salt = "18ry91xv60an82";
  starter = "";
  types: any = {};
  envstore: any = {

  };
  storage = 'LS, SS, CS';
  data: any = {
    'local' : "",
    'session' : "",
    'cookie': "",
  };
  

  constructor(private env: EnvService,
              // private messagingServices: MessagingService,
              private local: LocalStorageService, 
              private session: SessionStorageService,
              private cookie: CookieStorageService) 
  {
   // super(messagingServices);
    this.types = env.store.types;
    this.resetData();
  }

  
  
  private setStore(store:string){
    this.storage = store;
  }
  private renewKey = (key:string): string => { return this.starter+key }
  private encrypt = (txtToEncrypt: string): string => { return CryptoJS.AES.encrypt(txtToEncrypt,"18ry91xv60an82").toString() }
  private decrypt = (txtToDecrypt: string): string => { return CryptoJS.AES.decrypt(txtToDecrypt,"18ry91xv60an82").toString(CryptoJS.enc.Utf8) }
  private condition = (field:string , value: string | null | undefined ) => { return field === value;}   
  private type = (store: string = 'LS') => {
    if(store == 'SS') return this.session;
    else if(store == 'CS') return this.cookie;
    else return this.local;
  }
  // let find = (store: string, key: string): string => return this.decrypt(this.type(store).get(this.renewKey(key)));
  private mapTokenKey(value:any, store:string): any { 
    return { data: value, key: this.type(store).get(this.renewKey("token")) } 
  }
  private unmapTokenKey(value:any, store:string = "LS", validate:boolean = false): any|null {
    let key = value.key;
    let a = true; 
    if(validate == true){
      let token = this.type(store).get(this.renewKey("token"));
      a = (key == token)?true:false;
    }
    return (a==true)?value.data:null;
  }
  
  store(key: string, value: string | any) {//, store : string = 'LS'
   // let types = this.env.store.types;
    if(typeof value === 'object' || value instanceof Object){
      let generatekey = null;      
      for(let obkey of Object.keys(this.types)){
        if(generatekey == null) generatekey = this.encrypt(JSON.stringify(this.mapTokenKey(value, this.types[obkey])));
        this.type(this.types[obkey]).set(this.renewKey(key), generatekey);
      }      
    }
    else{
      for(let obkey of Object.keys(this.types)){
        this.type(this.types[obkey]).set(this.renewKey(key), value);
      } 
    }    
  }

  retrive(key: string, datatype:string = "String", subkey:string | null = null) : any | string
  {
    // let types = this.env.store.types;'
    this.resetData();
    if(datatype == "String"){
      for (let obkey of Object.keys(this.types)) {
        this.data[obkey] = this.type(this.types[obkey]).get(this.renewKey(key));
      }
    }
    else{
      for (let obkey of Object.keys(this.types)) {
        let storeData = this.type(this.types[obkey]).get(this.renewKey(key));
        if(storeData != null && storeData.length >= 1){
          if(subkey == null || subkey.length < 1){
            this.data[obkey] = this.unmapTokenKey(JSON.parse(this.decrypt(storeData)), this.types[obkey]);
          }
          else
          {
            let storeSubData = this.unmapTokenKey(JSON.parse(this.decrypt(storeData)), this.types[obkey]);
            this.data[obkey] = storeSubData[subkey]
          }
        }        
      }      
    }
    return this.data;

    // for (let [okey, ovalue] of Object.entries(types)) {
    //   let storeData = _self.type(ovalue).get(_self.renewKey(key));
    //   this.data[key] = this.unmapTokenKey(JSON.parse(this.decrypt(storeData)))
    // }
    // Object.entries(this.envstore.store.types).forEach(([key, index]) => {
    //   let storeData = _self.type(ovalue).get(_self.renewKey(key));
    //   this.data[key] = this.unmapTokenKey(JSON.parse(this.decrypt(storeData)))
    // });
    // Object.entries(this.envstore.store.types).forEach(([key, value]) => {
    //   this.data[key] = _self.type(value).get(_self.renewKey(key));
    // }); 
    //2nd attempt
    // Object.entries(obj).forEach(
    //   ([key, value]: [keyof objType, number | undefined]) => {
    //     if (value === undefined || value < 5) obj[key] = 5;
    //   }
    // );
    // for(let store of this.envstore.store.types){
    //   this.type(store).get(this.renewKey(key));
    // }
    //return this.type(store).get(this.renewKey(key));
    // let storeData = (data == null)?data:this.decrypt(data);
    // let storeDataOnV = (storeData != null && type != 'S')?this.unmapTokenKey(JSON.parse(this.decrypt(storeData))):storeData;
    // return (subkey != "" && subkey != null && type != 'S' && storeDataOnV != null)?storeDataOnV[subkey]:storeDataOnV;
  }
  resetData() {
    this.data = {
    'local' : "",
    'session' : "",
    'cookie': "",
    }
  }
  delete(key: string, subkey: string | null = null, type: string = 'S', store : string = 'LS') {
    if(subkey == null || type == 'S')
      this.type(store).remove(this.renewKey(key));
    else{
      let storeData = this.decrypt(this.type(store).get(this.renewKey(key)));
      let storeDataOnV = (storeData != null && type != 'S')?JSON.parse(storeData):storeData;
      if(subkey != "" && subkey != null && type != 'S' && storeDataOnV != null) delete storeDataOnV[subkey];
    }
  }
  clear(){
    let types = this.env.store.types;
    for (var obkey of Object.keys(this.types)) 
      this.type(this.types[obkey]).clean();   
  }
  StoreMany(key: string, value: string | any){
    if(this.storage.indexOf("SS") >= 0){
      this.StoreJson(key, value, "SS");
    }
    if(this.storage.indexOf("CS") >= 0){
      this.StoreJson(key, value, "CS");
    }
    if(this.storage.indexOf("LS") >= 0){
      this.StoreJson(key, value, "LS");
    }
  }
  StoreJson(key: string, value: string | any, store: string = "LS") {

    let nValue = this.encrypt(JSON.stringify(this.mapTokenKey(value,store)))
   // this.store(key, nValue, store);
  }
  select(key: string, subkey: string | null = null, validate: boolean = false) {
    let storeData =  this.retrive(key,"LS")
    this.data.local = (storeData != null)?this.unmapTokenKey(JSON.parse(this.decrypt(storeData))):storeData;
    storeData =  this.retrive(key,"SS")
    
    // return (subkey != "" && subkey != null && type != 'S' && storeDataOnV != null)?storeDataOnV[subkey]:storeDataOnV;
  

    return this.data = {
      local : this.retrive(key,"LS"),
      session : this.retrive(key,"SS"),
      cookie : this.retrive(key,"CS"),
    }
    

    // let loc = this.local.get(this.renewKey(key));
    // let ses = this.session.get(this.renewKey(key));
    // let cok = this.cookie.get(this.renewKey(key)); //(type == 'S')?this.local.get(key):JSON.parse(this.local.get(key));
    
    // let local = (loc != null && type != 'S')?JSON.parse(loc):loc;
    // let session = (ses != null && type != 'S')?JSON.parse(ses):ses;
    // let cookie = (cok != null && type != 'S')?JSON.parse(cok):cok;

    // this.data.local = (subkey != "" && subkey != null && type != 'S' && local != null)?local[subkey]:local;
    // this.data.session = (subkey != "" && subkey != null && type != 'S' && session != null)?session[subkey]:session;
    // this.data.cookie = (subkey != "" && subkey != null && type != 'S' && cookie != null)?cookie[subkey]:cookie;
   
    // return this.data;
  }
  // delete(key: string, subkey: string | null = null, type: string = 'S') {
  //   this.dele(key,subkey,type,"LS");
  //   this.dele(key,subkey,type,"SS");
  //   this.dele(key,subkey,type,"CS");
  // }
  // truncate(){
  //   this.clear("LS");
  //   this.clear("SS");
  //   this.clear("CS");
  // }
  
  
}

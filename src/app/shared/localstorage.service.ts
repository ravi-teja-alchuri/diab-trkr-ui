import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  constructor() { }

  private set(item: any, data: any) {
    localStorage.setItem(item, data);
  }
  public get(item: any) {
    var storeOb, lStore: any = localStorage.getItem(item);
    try {
      storeOb = JSON.parse(lStore);
    } catch (e) {
      storeOb = lStore;
    }
    return storeOb;
  }

  private remove(item: any) {
    localStorage.removeItem(item);
  }

  public obtoString(ob: any) {
    if (typeof ob === 'string')
      return ob
    return JSON.stringify(ob);
  }

  public saveItem(name: any, data: any) {
    this.set(name, this.obtoString(data));
  }


  public getItem(name: any) {
    return this.get(name);
  }
  public getLoginTryCount(){
    return parseInt(this.getItem('loginFailureCount'));
  }
  public setLoginTryCount(count:number){
    this.saveItem('loginFailureCount',count);
  }

  public removeItem(name: any) {
    this.remove(name);
  }

  public encode(s: any, k: any) {
    var enc = "";
    var str = "";
    if(s){
      str = s.toString();
      for (var i = 0; i < s.length; i++) {
        // create block
        var a = s.charCodeAt(i);
        // bitwise XOR
        var b = a ^ k;
        enc = enc + String.fromCharCode(b);
      }
    }
    return enc;
  }
}
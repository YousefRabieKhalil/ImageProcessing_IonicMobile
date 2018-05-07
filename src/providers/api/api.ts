import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedClass } from '../sharedClass';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }
  graylevel(imageBase64, graylevel) {
    let URL = `${SharedClass.BASR_UEL}/week1/graylevel`;
    return this.http.post(URL, { image: imageBase64, graylevel: graylevel })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient){}
  /* updateLog(newEntry: string) {
    return this._http.put("/update/", newEntry);
  } */
}

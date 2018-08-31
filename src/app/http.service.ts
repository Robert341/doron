import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  private _getDataUrl = '/api/get_data';
  constructor(private _http: Http) { }

  getData() {
    return this._http.get(this._getDataUrl)
      .map((response: Response) => response.json());
  }
}

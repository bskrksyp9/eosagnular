import { Injectable } from '@angular/core';
import * as Eos from 'eosjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw';
import { blockData } from './block';
import { catchError } from 'rxjs/operators';
import { transData } from './transfer';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
};



@Injectable({
  providedIn: 'root'
})
export class EosService {
  public eos: any;
  httpClient: any;


  constructor(private http: HttpClient) {
    this.eos = Eos.Localnet({
      httpEndpoint: environment.blockchainUrl
    })
  }

  getMBal(bdata2: transData) {
    return this.http.get<transData>(
      'http://localhost:3000' + "/balance"
    )
  }

  // getblockData(): Observable<blockData[]> {
  //   return this.http.get<blockData[]>(environment.blockchainUrl)
  //     .pipe(catchError(this.errorHandler))
  // }

  addRec(bdata: blockData): Observable<blockData> {
    return this.http.post<blockData>(
      'http://localhost:3000' + "/transfer",
      JSON.stringify(bdata),
      httpOptions
    );
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }


}

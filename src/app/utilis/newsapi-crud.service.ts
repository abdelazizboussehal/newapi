import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Response} from "../models/response";
import { Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsapiCrudService {

  constructor(private http: HttpClient) { }

  /*getEverything(url:string): Observable<Article[]>{
    return this.http.get<Response>('url'+1  )
      .pipe(
        map((response) => response.articles),
      );

  }*/
  getEverything(url:string,searchQuery:string): Observable<Response>{
    //from=2024-09-19&
    let args = `q=${searchQuery}&sortBy=publishedAt&apiKey=${environment.apikey}`
    return this.http.get<Response>(`${url}?${args}`  );
  }

  getEverythingFilterByDateRange(url:string,searchQuery:string,startDate:string,endDate:string): Observable<Response>{
    //&from=2024-10-19&to=2024-10-19&
    let args = `q=${searchQuery}&from=${startDate}&to=${endDate}&sortBy=publishedAt&apiKey=${environment.apikey}`
    return this.http.get<Response>(`${url}?${args}`  );
  }
}

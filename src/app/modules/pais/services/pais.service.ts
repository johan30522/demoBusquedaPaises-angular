import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import{catchError} from 'rxjs/operators';
import { Country } from '../interfaces/pais-interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:String='https://restcountries.eu/rest/v2';


  constructor(
    private readonly httpClient:HttpClient
  ) { }


  get  fields():string{
    return "name;population;numericCode;alpha3Code;alpha2Code;region;area;flag;capital";
  }
  public getPais(termino:string):Observable<Country[]>{
    const params=new HttpParams()
    .set('fields',this.fields);
    const url:string=`${this.apiUrl}/name/${termino}?fields=${this.fields}`;
    return this.httpClient
      .get<Country[]>(url,{params})
     /* .pipe(
        catchError(err=>of([]))
      );*/
  }

  public getCapital(termino:string):Observable<Country[]>{
    const params=new HttpParams()
    .set('fields',this.fields);
    const url:string=`${this.apiUrl}/capital/${termino}?fields=${this.fields}`;
    return this.httpClient
      .get<Country[]>(url,{params})
     /* .pipe(
        catchError(err=>of([]))
      );*/
  }


  public getPaisById(termino:string):Observable<Country>{
    const url:string=`${this.apiUrl}/alpha/${termino}`;
    return this.httpClient
      .get<Country>(url)
  }


  public getPaisByRegion(termino:string):Observable<Country[]>{
    const params=new HttpParams()
      .set('fields',this.fields);
    const url:string=`${this.apiUrl}/region/${termino}`;
    return this.httpClient
      .get<Country[]>(url,{params})
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AngularUiApiService {
  private readonly baseUrl: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }


  postProduct(productData: Product) {
    return this.httpClient.post<Product>(`${this.baseUrl}/products/`, productData)
      .pipe(catchError(this.handleError));
  }

  getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.baseUrl}/products/`)
      .pipe(catchError(this.handleError));
  }

  updateProduct( id: number, productData: Product){
    return this.httpClient.put<Product>(`${this.baseUrl}/products/${id}`, productData)
    .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number){
    return this.httpClient.delete<Product>(`${this.baseUrl}/products/${id}`)
    .pipe(catchError(this.handleError));
  }

  //https://stackoverflow.com/questions/68655492/throwerrorerror-is-now-deprecated-but-there-is-no-new-errorhttperrorresponse
  private handleError(err: HttpErrorResponse): Observable<never> {
    console.error(JSON.stringify(err));
    return throwError(() => err);
  }
}

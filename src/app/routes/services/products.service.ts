import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

  constructor(private http: HttpClient) { }

  listProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.baseUrl);
  }
  verifyIdProduct(id:string){
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<Products>(`${this.baseUrl}/verification`, {params});
  }
  addProduct(body: Products){
    return this.http.post<any>(this.baseUrl, body);
  }
  updateProduct(body:Products){
    return this.http.patch<any>(this.baseUrl, body);
  }
  deleteProduct(id:string){
    const params = new HttpParams()
      .set('responseType', 'text')
      .set('id', id);
    return this.http.delete<any>(this.baseUrl, {params});
  }
}

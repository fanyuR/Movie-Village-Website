import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAllCategories(): string[] {
    return ['Comedy', 'Adventure', 'Animation', 'Fantasy', 'Romance'];
  }

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>('/api/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('/api/products/' + id);
  }

  getCommentForProductId(id: number):  Observable<Comment[]> {
    return this.http.get<Comment[]>('/api/products/' + id + '/comments');
  }

  search(params: ProductSearchParams ):  Observable<Product[]> {
    return this.http.get<Product[]>('/api/products', {params: this.encodeParams(params)});
  }

  private encodeParams (params: ProductSearchParams) {
    let newParams = new HttpParams();
    for (let k in params) {
      if (params[k]) {
        newParams = newParams.append(k, params[k]);
      }
    }
    console.log(newParams)
    return newParams
  }


}

export class ProductSearchParams {

  constructor(public title: string,
              public price: number,
              public category: string
  ) {}
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public image: string,
    public categories: Array<string>) {
  }
}

export class Comment {
  constructor(public id: number,
              public productId: number,
              public timestamp: string,
              public user: string,
              public rating: number,
              public content: string) { }
}

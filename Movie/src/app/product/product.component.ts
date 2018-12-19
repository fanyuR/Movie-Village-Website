import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Product, ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';
import {computeStyle} from '@angular/animations/browser/src/util';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Observable<Product[]>;

  // private keyword: string;
  // private titleFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) {
    // this.titleFilter.valueChanges
    //   .debounceTime(500)
    //   .subscribe(
    //     value => this.keyword = value
    //    );
  }

  ngOnInit() {

    this.products = this.productService.getProducts();

    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );

    // console.log(this.products[0].image);
  }

}


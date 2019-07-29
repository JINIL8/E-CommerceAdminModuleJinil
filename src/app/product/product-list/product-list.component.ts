import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadProductTypeData();
  }

  loadProductTypeData() {
    this.productService.getProductsList().subscribe(res => {
      this.products = res;
      console.log(this.products);
    });
  }
}

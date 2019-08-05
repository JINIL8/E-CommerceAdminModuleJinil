import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Uploads } from 'src/app/class/uploads';
import { UploadsService } from 'src/app/service/uploads.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  files: Uploads[];
  constructor(/* private uploadService: UploadsService, */
    private productService: ProductService, private router: Router, private toastr: ToastrService,
    private uploadService: UploadsService) { }

  ngOnInit() {
    this.loadProductTypeData();
   // this.loadFileData();
  }

  loadProductTypeData() {
    this.productService.getProductsList().subscribe(res => {
      this.products = res;
      console.log(this.products);

    });
  }
   loadFileData() {
    this.uploadService.getFilesList().valueChanges().subscribe(res => {
      this.files = res;
      console.log(this.files);
    });
  }
  editProduct(id: string) {
    window.location.href = 'edit-product/' + id;
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    this.toastr.success('Product Deleted Successfully!!', 'Product');
  }

}

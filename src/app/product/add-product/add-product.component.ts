import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product, ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Uploads } from '../../class/uploads';
import { UploadsService } from '../../service/uploads.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Uploads;

  form: FormGroup;
  /*  //product_types = []; */
  data = [];

  product: Product = {
    product_name: '',
    product_type: '',
    description: '',
    price: 0,
    discount: 0,
  };


  constructor(private productService: ProductService, private toastr: ToastrService, 
    private formBuilder: FormBuilder, private upSvc: UploadsService) {

    this.form = this.formBuilder.group({
      product_name: '',
      description: '',
      price: 0,
      discount: 0,
      product_type: ['']
    });
  }
  ngOnInit() {

  }
  addProduct() {
    this.product = this.form.value;
    this.productService.addProduct(this.product);
    console.log(this.product);
    this.toastr.success('Product Added Successfully!!!', 'Product');
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Uploads(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

/* uploadSingle() {
 this.currentUpload = this.form.value;
 this.upSvc.addProduct(this.currentUpload);
 console.log(this.currentUpload);
}
 */
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product, ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Uploads } from '../../class/uploads';
import { UploadsService } from '../../service/uploads.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Uploads;

  form: FormGroup;
 // product_types = [];
  formType = 'Add';
  formButon = 'Save';
  data = [];

  product: Product = {
    product_name: '',
    product_type: '',
    description: '',
    price: 0,
    discount: 0,
  };


  constructor(private productService: ProductService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private upSvc: UploadsService, private route: ActivatedRoute) {

    this.form = this.formBuilder.group({
      product_name: '',
      description: '',
      price: 0,
      discount: 0,
      product_type: ['']
    });
  }
  ngOnInit() {
    this.reloadForm();
    const id = this.route.snapshot.params['id'];
    if (id && id !== '') {
      this.productService.getProductById(id).subscribe(res => {
        this.product = res;
        this.formType = 'Edit';
        this.formButon = 'Update';
        this.form.controls.id.patchValue(id);
        this.form.controls.product_type.patchValue(this.product.product_type);
    });
  }
  }
  reloadForm() {
    this.form = this.formBuilder.group({
      id: '',
      product_name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      product_type: ['']
    });
  }
  /*   addProduct() {
      this.product = this.form.value;
      this.productService.addProduct(this.product);
      console.log(this.product);
      this.toastr.success('Product Added Successfully!!!', 'Product');
    } */

  addProduct() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.productService.addProduct(data);
      this.toastr.success('Product Added Successfully!!!', 'Product');
    } else {
      this.productService.updateProduct(this.form.value.id, data);
      this.toastr.success('Product Updated Successfully!!!', 'Product');
    }

    setTimeout(function () {
      window.location.href = 'product-list';
    }, 3000);
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


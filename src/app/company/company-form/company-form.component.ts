import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlbumstorageService } from 'src/app/service/albumstorage.service';
import { AlbumsService, Image } from 'src/app/service/albums.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  images: Image[];
  formType = 'Add';
  formButon = 'Save';
  companyID = '';

  product: any = {
    imageUrl: '',
    company_name: '',
    description: '',
  };
  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage, private service: AlbumstorageService,
    private albumService: AlbumsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    const id = this.route.snapshot.params['id'];
    if (id && id !== '') {
      this.albumService.getImageById(id).subscribe(res => {
        this.companyID = id;
        this.product = res;
        this.formType = 'Edit';
        this.formButon = 'Update';
        this.formTemplate.controls.id.patchValue(this.companyID);
      });
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue) {
    const data = Object.assign({}, this.formTemplate.value);
    delete data.id;

    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const filePath = `Company/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      console.log(filePath);
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url);
            formValue[`imageUrl`] = url;
            this.albumService.addImage(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    } else {
      this.albumService.updateImage(this.companyID, data);

    }
    setTimeout(function () {
      window.location.href = 'album-list';
    }, 3000);
  }

  get formControls() {
    return this.formTemplate[`controls`];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      company_name: '',
      description: '',
      id: ''
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}


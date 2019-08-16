import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlbumstorageService } from 'src/app/service/albumstorage.service';
import { AlbumsService } from 'src/app/service/albums.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor(private storage: AngularFireStorage, private service: AlbumstorageService, private albumService: AlbumsService) { }

ngOnInit() {
  this.resetForm();
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
          this.service.insertImageDetails(formValue);
          this.albumService.addImage(formValue);
          /* this.albumService.addCompany(formValue); */
          this.resetForm();
        });
      })
    ).subscribe();
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
    description: ''
  });
  this.imgSrc = '/assets/img/image_placeholder.jpg';
  this.selectedImage = null;
  this.isSubmitted = false;
}

}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumstorageService {

  image: any;

  imageDetailList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  getImageList() {
    /* this.firebase.list('imageDetails')
      .valueChanges()
      .subscribe((data) => {
        this.image = data;
        return this.image;
      }); */
  }

  insertImageDetails(imageDetails) {
    this.getImageDetailList();
    this.imageDetailList.push(imageDetails);
  }
}

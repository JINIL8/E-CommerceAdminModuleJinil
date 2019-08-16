import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
export interface Image {
  imageUrl: string;
  company_name: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private ImagesCollection: AngularFirestoreCollection<Image>;
  private Images: Observable<Image[]>;


  constructor(private db: AngularFirestore) {

    this.ImagesCollection = db.collection<Image>('TBL_IMAGE');

    this.Images = this.ImagesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getCompanysList() {
    return this.Images;
  }
  updateCompany(id: string, company: Image) {
    return this.ImagesCollection.doc(id).update(company);
  }
 /*  addCompany(company: Image) {
    return this.ImagesCollection.add(company);
  } */
  getImagesList() {
    return this.Images;
  }
  addImage(image: Image) {
    return this.ImagesCollection.add(image);
  }
}

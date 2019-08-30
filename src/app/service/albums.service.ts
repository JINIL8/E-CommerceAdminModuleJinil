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

  private imagesCollection: AngularFirestoreCollection<Image>;
  private images: Observable<Image[]>;


  constructor(private db: AngularFirestore) {

    this.imagesCollection = db.collection<Image>('TBL_COMPANY');

    this.images = this.imagesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  updateImage(id: string, image: Image) {
    this.imagesCollection.doc(id).update(image);
  }
  getImageById(id) {
    return this.imagesCollection.doc<Image>(id).valueChanges();
  }
  getImagesList() {
       return this.images;
  }
  addImage(image: Image) {
    return this.imagesCollection.add(image);
  }
  deleteImage(id: string) {
    return this.imagesCollection.doc(id).delete();
  }

}

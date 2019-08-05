import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Uploads } from '../class/uploads';
import 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private af: AngularFireModule, private db: AngularFireDatabase) { }

  private basePath = `/uploads`;
  upload: AngularFireList<Uploads>;

  pushUpload(upload: Uploads) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        console.log(uploadTask);
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  getFilesList() {
    return this.upload;
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Uploads) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
}





/*
  constructor(private af: AngularFireModule, private db: AngularFireDatabase) { }
 */
/*  private productsCollection: AngularFirestoreCollection<Uploads>;
 private products: Observable<Uploads[]>;

 constructor(private db: AngularFirestore) {

   this.productsCollection = db.collection<Uploads>('TBL_PRODUCT');

   this.products = this.productsCollection.snapshotChanges().pipe(
     map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return { id, ...data };
       });
     })
   );
 }
 updateProduct(id: string, product: Uploads) {
   return this.productsCollection.doc(id).update(product);
 }

 addProduct(product: Uploads) {
   return this.productsCollection.add(product);
 }

 deleteProduct(id: string) {
   return this.productsCollection.doc(id).delete();
 }

*/

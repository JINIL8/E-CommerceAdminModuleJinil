import { Component, OnInit } from '@angular/core';
import { AlbumstorageService } from 'src/app/service/albumstorage.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styles: []
})
export class AlbumListComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];
  image: any;
  constructor(private service: AlbumstorageService, private firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.firebase.list('imageDetails')
      .valueChanges()
      .subscribe((data) => {
        this.imageList = data;
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
        console.log(this.imageList);
      });
    /* this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val();
        });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      }
    ); */
  }

}

import { Component, OnInit } from '@angular/core';
import { AlbumstorageService } from 'src/app/service/albumstorage.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlbumsService, Image } from 'src/app/service/albums.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styles: []
})
export class AlbumListComponent implements OnInit {
  images: Image[];
  imageList: Image[];
  rowIndexArray: any[];
  image: any;
  constructor(private storage: AngularFireStorage, private albumService: AlbumsService, private firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.loadImageData();
  }
  deleteImage(id: string, downloadUrl: string) {
    this.albumService.deleteImage(id);
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
  loadImageData() {
    this.albumService.getImagesList().subscribe(res => {
      this.imageList = res;
      this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      console.log(res);
    });
  }
  editImage(id: string) {
    window.location.href = 'editform/' + id;
  }

}

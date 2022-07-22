import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { FirestorageService } from '../services/firestorage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  collectionName: string = 'Diario';

  Titulo: string = '';
  Descripcion: string = '';
  Fecha: string;
  Img: string = '';
  Audio: string;

  imgName: string = ''
  audioName: string

  pipe = new DatePipe('en-US');

  constructor(private firestore: DatabaseService, private firestorage: FirestorageService) { }

  srcImg: string | ArrayBuffer = ''
  audios: any[] = []

  cargarImagen(event: any) {
    let file = event.target.files[0]
    let reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onloadend = () => {
    /*      console.log(reader.result)
          console.log(event) */
      this.srcImg = reader.result
      this.firestorage.subirImg(`${file.name}` + '_' + Date.now(), reader.result).then(urlImg => {
        this.Img = urlImg
      })
    }
  }

  agregar() {

    if (this.Titulo != '' && this.Descripcion != '' && this.imgName != '') {

      this.firestore.create(this.collectionName, {
        Titulo: this.Titulo,
        Fecha: this.pipe.transform(new Date(), 'dd/MM/YYYY'),
        Descripcion: this.Descripcion,
        Img: this.Img,
        //Audio: this.Audio
      })
      this.clear()
    }

  }

  clear() {
    this.Titulo = '';
    this.Descripcion = '';
    this.Img = ''
    this.srcImg = ''
    this.imgName = ''
  }

}

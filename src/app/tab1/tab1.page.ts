import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  Entradas:any[] = []
  bool:any[] = []
  ids:any[] = []

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getAll('Diario').then((firebaseResponse)=>{
      firebaseResponse.subscribe((listaDeEntradasRef)=>{
        

        this.Entradas = listaDeEntradasRef.map(EntradaRef=>{
          this.bool.push(false)
          let entrada = EntradaRef.payload.doc.data()
          entrada['id'] = EntradaRef.payload.doc.id
          this.ids.push(EntradaRef.payload.doc.id) 
          return entrada
        })
      })
    })
  }


  show(i){
    this.bool[i] = !this.bool[i] 
  }

  delete(id){
    this.database.delete('Diario', id)
  }

  deleteAll(){
    for (let index = 0; index < this.ids.length; index++) {
      this.database.delete('Diario', this.ids[index])      
    }
  }

 
}

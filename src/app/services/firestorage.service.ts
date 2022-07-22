import { Injectable } from '@angular/core';
import  firebase  from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  storageRef = firebase.app().storage().ref();

  constructor() { }

  async subirImg(nombre:string, imgBase64:any){
    try {
      let response = await this.storageRef.child('images/'+nombre).putString(imgBase64, 'data_url')
      console.log(response)
      return await response.ref.getDownloadURL()
    } catch (error) {
      console.log(error)
      return null
    }
  }
}



import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  async create(collection: string, dato: unknown) {
    try {
      return await this.firestore.collection(collection).add(dato);
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  async getAll(collection) {
    try {
      return await this.firestore.collection(collection).snapshotChanges()
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  async getById(collection, id) {
    try {
      return await this.firestore.collection(collection).doc(id).get()
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  async delete(collection, id) {
    try {
      return await this.firestore.collection(collection).doc(id).delete()
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  async update(collection, id, dato) {
    try {
      return await this.firestore.collection(collection).doc(id).set(dato)
    } catch (error) {
      console.log('Error: ', error)
    }
  }
}

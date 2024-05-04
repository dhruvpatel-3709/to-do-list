import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';

import { CollectionReference, DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { toDos } from './to-do-list/to-do-list';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db!: Firestore;
  toDoCol!: CollectionReference<DocumentData>;
// analytics = getAnalytics(this.app);
  constructor() {
    initializeApp(environment.firebaseConfig);
    this.db = getFirestore();
    this.toDoCol = collection(this.db, 'To-Do List');
   }
   async getToDos() {
    const snapshot = await getDocs(this.toDoCol);
    return snapshot;
  }

  async addStudent(data:toDos) {
    await addDoc(this.toDoCol, data)
    return;
  }
  async deleteTodo(docId: string) {
    const docRef = doc(this.db, 'To-Do List', docId)
    await deleteDoc(docRef);
    return;
  }
  async updateToDo(docId: string, data:toDos) {
    debugger
    delete data.id;
      const docRef = doc(this.db, 'To-Do List', docId);
      await updateDoc(docRef,  {title:data.title,description:data.description,dueDate:data.dueDate,attachment:data.attachment} );
      return;
    }
}

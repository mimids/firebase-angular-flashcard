import { Injectable } from '@angular/core';
import {
  Firestore,
  getDocs,
  getDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Account } from '../core/models/user.model';
import { Category, Vocabulary } from '../interfaces/card';
import { UUidService } from './uuid.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private fire: Firestore, private uid: UUidService) {}

  setFireUsers(user: Account) {
    const uDoc = doc(this.fire, 'users', user.uid!);
    setDoc(uDoc, user, { merge: true });
  }
  async getFireUser(uid: string) {
    const uDoc = doc(this.fire, 'users', uid);
    return await getDoc(uDoc);
  }

  CreateVocabulary(voca: Vocabulary) {
    const uDoc = doc(this.fire, 'Vocabulary', this.uid.generateUUID());
    setDoc(uDoc, voca, { merge: true });
  }

  createCategory(data: Category) {
    const cateRef = collection(this.fire, 'Category');
    setDoc(doc(cateRef, data.category), data, { merge: true });
  }
  async createItem(category: string, item: string[],result:string){
    const docRef = doc(this.fire, "Category", category);
    item.push(result);
    await updateDoc(docRef, {item:item});
  }

  async deleteCategory(category: string){
    const docRef = doc(this.fire, "Category", category);
    await deleteDoc(docRef);
  }

  async deleteItem(category: string, item: string[]){
    const docRef = doc(this.fire, "Category", category);
    await updateDoc(docRef, {item:item});
  }

  // UpdateCard(uuid:string , ):void{

  //   const uDoc = doc(this.fire, 'Card', uuid!);
  //   setDoc(uDoc, Card, { merge: true });

  // }


  CreateCard() {}
  ListCards() {}
  ListCategories() {}
}

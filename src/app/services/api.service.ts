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
import { Category, FlashCardList, Vocabulary } from '../interfaces/card';
import { DbCollection } from '../interfaces/firebase';
import { LocalStorageService } from './local-storage.service';
import { UUidService } from './uuid.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  userUid='';
  constructor(
    private fire: Firestore,
    private uid: UUidService,
    private readonly localStorageService: LocalStorageService,
  ) { }

  async setFireUsers(user: Account) {
    this.userUid!=user.uid;
    const uDoc = doc(this.fire, 'users', user.uid!);
    await setDoc(uDoc, user, { merge: true });
  }
  async getFireUser(uid: string) {
    const uDoc = doc(this.fire, 'users', uid);
    return await getDoc(uDoc);
  }

  async createVocabulary(voca: Vocabulary) {
    const uDoc = doc(this.fire, DbCollection.Vocabulary, this.uid.generateUUID());
    await setDoc(uDoc, voca, { merge: true });
  }

  async createFlashCardList(name: string) {
    const uDoc = doc(this.fire, DbCollection.FlashCardList, this.uid.generateUUID());
    const account=this.localStorageService.getItemInStorage('account') as Account;
    if (account.uid !==  undefined) {
      const data: FlashCardList = { name: name, uid: account.uid }
      await setDoc(uDoc, data, { merge: true });
    }
  }

  async createCategory(data: Category) {
    const cateRef = collection(this.fire, DbCollection.Category);
    await setDoc(doc(cateRef, data.category), data, { merge: true });
  }

  async createItem(category: string, item: string[], result: string) {
    const docRef = doc(this.fire, DbCollection.Category, category);
    item.push(result);
    await updateDoc(docRef, { item: item });
  }

  async deleteFlashcardList(id: string) {
    const docRef = doc(this.fire, DbCollection.FlashCardList, id);
    await deleteDoc(docRef);
  }

  async deleteCategory(category: string) {
    const docRef = doc(this.fire, DbCollection.Category, category);
    await deleteDoc(docRef);
  }

  async deleteItem(category: string, item: string[]) {
    const docRef = doc(this.fire, DbCollection.Category, category);
    await updateDoc(docRef, { item: item });
  }

}

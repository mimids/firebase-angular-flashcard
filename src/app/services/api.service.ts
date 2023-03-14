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
  query,
  where,
} from '@angular/fire/firestore';
import { Account } from '../interfaces/user';
import { Category, FlashCard, FlashCardList, Vocabulary } from '../interfaces/card';
import { DbCollection } from '../interfaces/firebase';
import { LocalStorageService } from './local-storage.service';
import { UUidService } from './uuid.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  userUid = '';
  constructor(
    private fire: Firestore,
    private uid: UUidService,
    private readonly localStorageService: LocalStorageService,
  ) { }
// for user

  async setFireUsers(user: Account) {
    this.userUid != user.uid;
    const u = user;
    u.password = '';
    const uDoc = doc(this.fire, DbCollection.Users, user.uid!);
    await setDoc(uDoc, u, { merge: true });
  }
  
  async getFireUser(uid: string) {
    const uDoc = doc(this.fire, DbCollection.Users, uid);
    return await getDoc(uDoc);
  }

// create
  async createVocabulary(voca: Vocabulary) {
    const uDoc = doc(this.fire, DbCollection.Vocabularys, this.uid.generateUUID());
    await setDoc(uDoc, voca, { merge: true });
  }

  async createFlashCardList(name: string) {
    const uDoc = doc(this.fire, DbCollection.FlashCardList, this.uid.generateUUID());
    const account = this.localStorageService.getItemInStorage('account') as Account;
    if (account.uid !== undefined) {
      const data: FlashCardList = { name: name, uid: account.uid }
      await setDoc(uDoc, data, { merge: true });
    }
  }
  async createFlashcard(data: FlashCard) {
    const Ref = collection(this.fire, DbCollection.FlashCards);
    await setDoc(doc(Ref), data, { merge: true });
  }

  async createCategory(data: Category) {
    const cateRef = collection(this.fire, DbCollection.Categorys);
    await setDoc(doc(cateRef, data.category), data, { merge: true });
  }

  async createItem(category: string, item: string[], result: string) {
    const docRef = doc(this.fire, DbCollection.Categorys, category);
    item.push(result);
    await updateDoc(docRef, { item: item });
  }

  // delete
  async deleteRow(dbName: string, id: string) {
    const docRef = doc(this.fire, dbName, id);
    await deleteDoc(docRef);
  }

  async deleteFlashcardList(id: string) {
    await this.deleteRow(DbCollection.FlashCardList, id);
  }

  async deleteFlashcard(id: string) {
    await this.deleteRow(DbCollection.FlashCards, id);
  }

  async deleteCategory(category: string) {
    await this.deleteRow(DbCollection.Categorys, category);
  }

  async deleteVocabulary(id: string) {
    await this.deleteRow(DbCollection.Vocabularys, id);
  }

  async deleteItem(category: string, item: string[]) {
    const docRef = doc(this.fire, DbCollection.Categorys, category);
    await updateDoc(docRef, { item: item });
  }

  // update
  async updateFlashcard(cardid: string, isRight: boolean) {
    const docRef = doc(this.fire, DbCollection.FlashCards, cardid);
    await updateDoc(docRef, { isRight: isRight });
  }
  async updateVocabulary(id: string, data: Vocabulary) {
    const docRef = doc(this.fire, DbCollection.Vocabularys,id);
    await setDoc(docRef,data );
  }
  //reset
  async resetFlashcard(uid: string) {
    const q = query(collection(this.fire, DbCollection.FlashCards), where('uid', '==', uid));

    getDocs(q)
      .then(d => {
        d.forEach(async d => {
          const docData = d.data();
          const docRef = doc(this.fire, DbCollection.FlashCards, d.id);
          await updateDoc(docRef, { isRight: false });
        })
      })
      .catch(er => console.log(er))

  }

}

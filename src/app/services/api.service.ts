import { Injectable } from '@angular/core';
import {
  Firestore,
  getDocs,
  getDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Account } from '../core/models/user.model';
import { Vocabulary } from '../interfaces/card';
import { UserI } from '../interfaces/user';
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

  // UpdateCard(uuid:string , ):void{

  //   const uDoc = doc(this.fire, 'Card', uuid!);
  //   setDoc(uDoc, Card, { merge: true });

  // }


  CreateCard() {}
  ListCards() {}
  ListCategories() {}
  CreateCategory() {}
}

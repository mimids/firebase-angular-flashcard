import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { onSnapshot, query, where, collection, Firestore, setDoc, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { FlashCard, FlashCardList, Vocabulary } from '../interfaces/card';
import { DbCollection } from '../interfaces/firebase';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  datas: FlashCard[] = [];
  @Input()
  card!: FlashCard;
  flashcardlist: FlashCardList[] = [];
  selectedFlashCard:string='';
  uid:string='';
  constructor(
    private fire: Firestore,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.show();
  }

  show() {
    onSnapshot(collection(this.fire, DbCollection.FlashCardList),
      (d) => {
        this.flashcardlist = [];
        d.forEach(doc => {
          const docData = doc.data();
          docData.id = doc.id;
          this.flashcardlist.push(docData as FlashCardList);
        })
        this.changeDetectorRef.detectChanges();
      })
  }

  async setFlashcard(uid: string) {
this.uid=uid;
    const q = query(collection(this.fire, DbCollection.FlashCards), where('uid','==', uid),where('isRight','==', (null || false)));
    onSnapshot(q,d => {
      this.datas=[];
      d.forEach(doc => {

        const docData = doc.data();
        docData.id = doc.id;
        this.datas.push(docData as FlashCard);
      })
      this.changeDetectorRef.detectChanges();
    })
  }


  reset() {
    this.apiService.resetFlashcard(this.uid);
   }
  saveAnswer(event: {id:string,isRight:boolean}) { 
    this.apiService.updateFlashcard(event.id, event.isRight);
  }

}

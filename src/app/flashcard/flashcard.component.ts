import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Firestore, getDocs, getDoc, collection, doc } from '@angular/fire/firestore';
import { Vocabulary } from '../interfaces/card';
import { DbCollection } from '../interfaces/firebase';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  datas : Vocabulary[]  = [];
  @Input()
  card!: Vocabulary;

  constructor(
    private fire: Firestore,
    private api: ApiService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    getDocs(collection(this.fire, DbCollection.Vocabularys))
    .then(d => {
      d.forEach(p => {
        this.datas.push(p.data() as Vocabulary);
      })
      console.log('dd',this.datas);
      this.changeDetectorRef.detectChanges();
    })
    .catch(er => console.log(er))
}

  delete(){}
  reset(){}
  saveAnswer(event:Event){}

}

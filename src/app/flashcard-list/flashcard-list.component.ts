import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Vocabulary } from '../interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { Firestore, getDocs, getDoc, collection, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss'],
})
export class FlashcardListComponent implements OnInit {
  datas : Vocabulary[]  = [];

  constructor(
    private fire: Firestore,
    private api: ApiService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

   ngOnInit() {

      getDocs(collection(this.fire, 'Vocabulary'))
          .then(d => {
            d.forEach(p => {
              this.datas.push(p.data() as Vocabulary);
            })
            this.changeDetectorRef.detectChanges();
          })
          .catch(er => console.log(er))
      }
}

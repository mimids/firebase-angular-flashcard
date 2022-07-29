import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { onSnapshot, query, where, collection, Firestore, setDoc, getDocs } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/card';
import { FlashCard } from 'src/app/interfaces/card';
import { DbCollection } from 'src/app/interfaces/firebase';
import { ApiService } from 'src/app/services/api.service';
import { CategoryService } from 'src/app/services/category.service';
import { Vocabulary } from 'out/ng-flash-card-front-linux-x64/resources/app/src/app/interfaces/card';

@Component({
  selector: 'app-flashcard-edit',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.scss']
})
export class FlashcardEditComponent implements OnInit {
  public formFlash: FormGroup;
  flashcards: FlashCard[] = [];
  vocabularys : Vocabulary[]=[];
  alphabetList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z']
  id = '';
  constructor(
    private fire: Firestore,
    private apiService: ApiService,
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    readonly categoryService: CategoryService

  ) {
    this.formFlash = this.fb.group({
      categorys: new FormControl('', [Validators.required]),
      alphabets: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.show();
  }

  async setVocabulary(data: any) {
    console.log('data', data);

    const q = query(collection(this.fire, DbCollection.Vocabulary), where('categorys', 'array-contains-any', ['west_coast', 'repas']));
    const querySnapshot = await getDocs(q);

    this.vocabularys = [];
    querySnapshot.forEach(doc => {
      const docData = doc.data();
      docData.id = doc.id;
      this.vocabularys.push(docData as Vocabulary);
    })
    this.changeDetectorRef.detectChanges();

  }
  show() {
    const q = query(collection(this.fire, DbCollection.FlashCard), where("uid", "==", this.id));
    onSnapshot(q,
      (d) => {
        this.flashcards = [];
        d.forEach(doc => {
          const docData = doc.data();
          docData.id = doc.id;
          this.flashcards.push(docData as FlashCard);
        })
        this.changeDetectorRef.detectChanges();
      })
  }

}



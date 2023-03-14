import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { onSnapshot, query, where, collection, Firestore, setDoc, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonWord } from 'src/app/interfaces/card';
import { FlashCard } from 'src/app/interfaces/card';
import { DbCollection } from 'src/app/interfaces/firebase';
import { ApiService } from 'src/app/services/api.service';
import { CategoryService } from 'src/app/services/category.service';
import { Vocabulary } from 'src/app/interfaces/card';

@Component({
  selector: 'app-flashcard-edit',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.scss']
})
export class FlashcardEditComponent implements OnInit {
  public formFlash: FormGroup;
  flashcards: FlashCard[] = [];
  vocabularys: Vocabulary[] = [];
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

  async setVocabulary(data: {categorys:string,alphabets:string}) {
    
    let q = query(collection(this.fire, DbCollection.Vocabularys));
    if (data.categorys != CommonWord.ALL ) {
      
      q = query(collection(this.fire, DbCollection.Vocabularys), where('categorys','array-contains-any',[data.categorys]));
    }
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
    const q = query(collection(this.fire, DbCollection.FlashCards), where("uid", "==", this.id));
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

  async deleteFlashcard(id: string | undefined) {
    if (id !== undefined) {
      await this.apiService.deleteFlashcard(id);
    }
  }
  async setFlashcard(idcard: (string | null | undefined)) {
    if (idcard !== undefined && idcard !== null) {

      const ColleRef = collection(this.fire, DbCollection.Vocabularys);

      const docRef = doc(ColleRef, idcard);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const flashcard = docSnap.data();
        flashcard.uid = this.id;
        await this.apiService.createFlashcard(flashcard as FlashCard);
      } else {
        console.log("No such document!");
      }
    }

  }
}



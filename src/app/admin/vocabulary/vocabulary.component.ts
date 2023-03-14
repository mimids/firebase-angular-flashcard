import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CommonWord, FlashCard, Vocabulary } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { Firestore, getDocs, getDoc, collection, doc, onSnapshot, where, query } from '@angular/fire/firestore';
import { DbCollection } from 'src/app/interfaces/firebase';
import { CategoryService } from 'src/app/services/category.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {
  public formVoca: FormGroup;
  public vocabularys: Vocabulary[]=[];
  public formFlash: FormGroup;
  defaultWordLang='fr';
  defaultMeeningLang='en';
  @Output() checkedChange: EventEmitter<MatRadioChange> | undefined ;

  constructor(
    private fire: Firestore,
    private apiService: ApiService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly  categoryService: CategoryService
  ) {
    this.formVoca = this.fb.group({
      categorys: new FormControl('', [Validators.required]),
      word: ['', Validators.required,, Validators.minLength(1)],
      meaning: ['', Validators.required,, Validators.minLength(1)],
      lang_word: ['fr', Validators.required],
      lang_meaning: ['en', Validators.required],
    });
    this.formFlash = this.fb.group({
      categorys: new FormControl('', [Validators.required]),
      alphabets: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
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
  async createVoca(data: Vocabulary) {
    await this.apiService.createVocabulary(data);
  }

  show(): void {
          onSnapshot(query(collection(this.fire, DbCollection.Vocabularys)),
      (d) => {
        this.vocabularys = [];
        d.forEach(doc => {
          const docData = doc.data();
          docData.id = doc.id;
          this.vocabularys.push(docData as Vocabulary);
        })
        this.changeDetectorRef.detectChanges();
      })
  }

  async deleteVocabulary(id: string | undefined | null){
    if (id !== undefined && id !== null) {
      await this.apiService.deleteVocabulary(id);
    }
  }
  ngOnDestroy() {

  }
}

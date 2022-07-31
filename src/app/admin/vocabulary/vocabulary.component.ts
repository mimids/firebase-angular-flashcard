import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, FlashCard, Vocabulary } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { Firestore, getDocs, getDoc, collection, doc, onSnapshot, where, query } from '@angular/fire/firestore';
import { DbCollection } from 'src/app/interfaces/firebase';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {
  public formVoca: FormGroup;
  public vocabularys: Vocabulary[]=[];

  constructor(
    private fire: Firestore,
    private apiService: ApiService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly  categoryService: CategoryService
  ) {
    this.formVoca = this.fb.group({
      categorys: new FormControl('', [Validators.required]),
      word: ['', Validators.required],
      meaning: ['', Validators.required],
      lang_word: ['', Validators.required],
      lang_meaning: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.show();
  }

  async createVoca(data: Vocabulary) {
    console.log('this.formVoca.get',this.formVoca.get('categorys')?.value);
    
    if(data.word!='' && data.meaning !='' && data.lang_meaning !='' && data.lang_word!=''){
    await this.apiService.createVocabulary(data);
    }
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

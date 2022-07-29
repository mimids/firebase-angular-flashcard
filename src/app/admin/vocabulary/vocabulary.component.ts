import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Vocabulary } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Firestore, getDocs, getDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { DbCollection } from 'src/app/interfaces/firebase';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {
  public formVoca: FormGroup;
  public datas: Array<Vocabulary> = [];

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
    await this.apiService.createVocabulary(data);
  }

  show(): void {
    onSnapshot(collection(this.fire, DbCollection.Vocabularys),
      (d) => {
        this.datas = [];
        d.forEach(doc => {
          const docData = doc.data();
          docData.id = doc.id;
          this.datas.push(docData as Vocabulary);
          // console.log('dockData',docData);
        })
        this.changeDetectorRef.detectChanges();
      })
  }


  ngOnDestroy() {

  }
}

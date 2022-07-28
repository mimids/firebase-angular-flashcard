import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Vocabulary } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Firestore, getDocs, getDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { DbCollection } from 'src/app/interfaces/firebase';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {
  public formVoca: FormGroup;
  public datas: Array<Vocabulary> = [];
  categoryList: string[] = [];

  constructor(
    private fire: Firestore,
    private apiService: ApiService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
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
    this.setCategory();
  }

  async createVoca(data: Vocabulary) {
    await this.apiService.createVocabulary(data);
  }

  show(): void {
    onSnapshot(collection(this.fire, DbCollection.Vocabulary),
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

  setCategory() {
    onSnapshot(collection(this.fire, DbCollection.Category),
      (d) => {
        this.categoryList = [];
        d.forEach(doc => {
          const docData = doc.data() as Category;
          if (docData.item.length !== 0) {
            docData.item.forEach((p)=>{
              this.categoryList.push(p);
            })
          }
        })
        this.changeDetectorRef.detectChanges();
      })
  }
  ngOnDestroy() {

  }
}

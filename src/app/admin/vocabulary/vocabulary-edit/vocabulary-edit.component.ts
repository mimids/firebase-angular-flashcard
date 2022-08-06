import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Firestore, getDocs, getDoc, collection, doc, onSnapshot, where, query } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Vocabulary } from 'src/app/interfaces/card';
import { DbCollection } from 'src/app/interfaces/firebase';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-vocabulary-edit',
  templateUrl: './vocabulary-edit.component.html',
  styleUrls: ['./vocabulary-edit.component.scss']
})
export class VocabularyEditComponent implements OnInit{
  data: Vocabulary = <Vocabulary>{};
  id = '';


  public formVoca: FormGroup;
  constructor(
    private fire: Firestore,
    private fb: FormBuilder,
    private apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly categoryService: CategoryService
  ) {
    this.formVoca = this.fb.group({
      categorys: ['', Validators.required],
      word: ['', Validators.required,, Validators.minLength(1)],
      meaning: ['', Validators.required,, Validators.minLength(1)],
      lang_word: ['', Validators.required],
      lang_meaning: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.getVocabulary();
    this.formVoca.controls['word'].setValue(this.data.word);
  }

  async getVocabulary() {
    const docRef = doc(this.fire, DbCollection.Vocabularys, this.id);
    const docSnap = await getDoc(docRef);
    this.data = docSnap.data() as Vocabulary;
    this.data.id = docSnap.id;
    this.changeDetectorRef.detectChanges();
  }

  updateVoca(data: Vocabulary) {
    this.apiService.updateVocabulary(this.id, data);
    this.router.navigate(['/admin/vocabulary'], { queryParams: { id: this.id } });
  }

}

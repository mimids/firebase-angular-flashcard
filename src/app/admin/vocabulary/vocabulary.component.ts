import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vocabulary } from 'src/app/interfaces/card';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Firestore, getDocs, getDoc, collection, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {
  public createForm: FormGroup;
  public datas: Array<Vocabulary> = [];

  constructor(
    private fire: Firestore,
    private api:ApiService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly snackbarService: SnackbarService
  ) {
    this.createForm = this.fb.group({
      word: ['', Validators.required],
      meaning: ['', Validators.required],
      lang_word: ['', Validators.required],
      lang_meaning: ['', Validators.required],
    });
  }

  async ngOnInit() {
this.setList();
}



  public onCreate(data: Vocabulary) {
    console.log(data);
    
    this.api
      .CreateVocabulary(data);
this.setList();

      // .then((event) => {
      //   console.log('item created!');
      //   this.snackbarService.open('item created!', 'accent'),
      //   this.createForm.reset();
      // })
      // .catch((e) => {
      //   this.snackbarService.open('error creating data...', 'warn'),
      //     console.log('error creating data...', e);
      // });
  }

setList():void{
  getDocs(collection(this.fire, 'Vocabulary'))
  .then(d => {

    d.forEach(p => {
      this.datas.push(p.data() as Vocabulary);
    })

    this.changeDetectorRef.detectChanges();
  })
  .catch(er => console.log(er))
}
  ngOnDestroy() {
   
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { onSnapshot,query, where, collection, Firestore } from '@angular/fire/firestore';
import { Category, CommonWord } from './interfaces/card';
import { DbCollection } from './interfaces/firebase';
import { CategoryService } from './services/category.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';



@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private fire: Firestore,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private categoryService: CategoryService
  ) {
    registerLocaleData(localeFr, 'fr-FR');

  }
  ngOnInit(): void {
    this.setCategory();
  }

  setCategory() {
    onSnapshot(collection(this.fire, DbCollection.Categorys),
      (d) => {
        this.categoryService.categoryList = [CommonWord.ALL];
        d.forEach(doc => {
          const docData = doc.data() as Category;
          if (docData.item.length !== 0) {
            docData.item.forEach((p)=>{
              this.categoryService.categoryList.push(p);
            })
          }
        })
        this.changeDetectorRef.detectChanges();
      })
  }
}

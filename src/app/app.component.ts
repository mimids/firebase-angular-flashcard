import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { onSnapshot,query, where, collection, Firestore } from '@angular/fire/firestore';
import { Category } from './interfaces/card';
import { DbCollection } from './interfaces/firebase';
import { CategoryService } from './services/category.service';

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
  ) {}
  ngOnInit(): void {
    this.setCategory();
  }

  setCategory() {
    onSnapshot(collection(this.fire, DbCollection.Category),
      (d) => {
        this.categoryService.categoryList = [];
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

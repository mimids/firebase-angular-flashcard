import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { onSnapshot,query, where, collection, Firestore } from '@angular/fire/firestore';
import { Category, CommonWord } from './interfaces/card';
import { DbCollection } from './interfaces/firebase';
import { CategoryService } from './services/category.service';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { AuthService } from './services/auth.service';
import { Account } from './interfaces/user';
import { UserService } from './services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  account: Account | undefined;
  private readonly isDestroyed$ = new Subject<boolean>();
  constructor(
    private fire: Firestore,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private categoryService: CategoryService,
    public auth: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    registerLocaleData(localeFr, 'fr-FR');

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit():void{
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

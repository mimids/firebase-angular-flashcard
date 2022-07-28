import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { Firestore, getDocs, getDoc, collection, doc, setDoc, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shard/components/dialog/dialog.component';
import { Category } from 'src/app/interfaces/card';
import { DbCollection } from 'src/app/interfaces/firebase';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  categorys: Category[] = [];
  categoryName: string = '';
  itemName: string = '';

  constructor(
    private fire: Firestore,
    private apiService: ApiService,
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.show()
  }
  show() {
    onSnapshot(collection(this.fire, DbCollection.Category),
    (d)  => {
      this.categorys = [];
        d.forEach(doc => {
          const docData=doc.data();
          docData.id=doc.id;
          this.categorys.push(docData as Category);
        })
        this.changeDetectorRef.detectChanges();
      })
  }

  setCategory(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title : 'Category'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog category was closed', result);
      this.addCategory(result);
    });
  }

  setItem(category: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Item'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog item was closed', result);
      this.categorys.forEach(async element => {
        if (element.category === category) {
          await this.apiService.createItem(category,element.item,result );
        }
      })
    });
  }

  deleteItem(category: string, no: number) {
    this.categorys.forEach(async element => {
      if (element.category === category) {
        element.item.splice(no, 1);
        await this.apiService.deleteItem(category, element.item);
      }
    })
  }

  async addCategory(cate: string) {
    const category =
    {
      category: cate,
      item: [],
    };
    await this.apiService.createCategory(category);
  }

  async deleteCategory(category: string) {
    await this.apiService.deleteCategory(category);
  }
}


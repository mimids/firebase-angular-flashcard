import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { Firestore, getDocs, getDoc, collection, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from 'src/app/shard/components/dialog-category/dialog-category.component';
import { Category } from 'src/app/interfaces/card';

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
    this.categorys = [];
    getDocs(collection(this.fire, 'Category'))
      .then(d => {
        d.forEach(p => {
          this.categorys.push(p.data() as Category);
        })
        this.changeDetectorRef.detectChanges();
      })
      .catch(er => console.log(er))
  }

  setCategory(): void {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog category was closed', result);
      this.addCategory(result);
      this.show();
    });
  }

  setItem(category: string): void {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog item was closed', result);
      this.categorys.forEach(async element => {
        if (element.category === category) {
          await this.apiService.createItem(category,element.item,result );
          this.show();
        }
      })
    });
  }

  deleteItem(category: string, no: number) {
    this.categorys.forEach(async element => {
      if (element.category === category) {
        element.item.splice(no, 1);
        await this.apiService.deleteItem(category, element.item);
        this.show();
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
    this.show();
  }
}


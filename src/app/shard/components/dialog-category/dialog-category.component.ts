import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
export type DialogDataSubmitCallback<T> = (row: T) => void;@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent {
  input: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    public dialogRef: MatDialogRef<DialogCategoryComponent>,
  ) {}
  cancel(): void {
    this.dialogRef.close();
  }
  close(data : string): void {
    this.dialogRef.close(data);
  }
}

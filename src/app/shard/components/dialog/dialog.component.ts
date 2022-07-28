import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
export type DialogDataSubmitCallback<T> = (row: T) => void;@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  input: FormControl = new FormControl('');
  title='';

  constructor(
    @Inject(MAT_DIALOG_DATA) private   data: { title: string },
    public dialogRef: MatDialogRef<DialogComponent>,
  ) {
    this.title=this.data.title;

  }
  cancel(): void {
    this.dialogRef.close();
  }
  close(data : string): void {
    this.dialogRef.close(data);
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FlashCardList } from 'src/app/interfaces/card';
import { DbCollection } from 'src/app/interfaces/firebase';
import { ApiService } from 'src/app/services/api.service';
import { UUidService } from 'src/app/services/uuid.service';
import { DialogComponent } from 'src/app/shard/components/dialog/dialog.component';

@Component({
  selector: 'app-flachcard-list',
  templateUrl: './flachcard-list.component.html',
  styleUrls: ['./flachcard-list.component.scss']
})
export class FlachcardListComponent implements OnInit {
  flashcardlist: FlashCardList[] = [];
  constructor(
    private fire: Firestore,
    private apiService: ApiService,
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.show()
  }
  show() {
    onSnapshot(collection(this.fire, DbCollection.FlashCardList),
      (d) => {
        this.flashcardlist = [];
        d.forEach(doc => {
          const docData = doc.data();
          docData.id = doc.id;
          this.flashcardlist.push(docData as FlashCardList);
        })
        this.changeDetectorRef.detectChanges();
      })
  }

  setFlashcardList(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Flashcard List' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog Flash Card was closed', result);
      this.addFlashcardList(result);
    });
  }

  async addFlashcardList(name: string) {
    await this.apiService.createFlashCardList(name);
  }

  async deleteFlashcardList(id: (string | null | undefined)) {
    if (id !== undefined && id !== null) {
      await this.apiService.deleteFlashcardList(id);
    }
  }
}

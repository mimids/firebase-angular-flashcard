import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardComponent } from './flashcard.component';
import { FlashcardContentsComponent } from './flashcard-contents/flashcard-contents.component';

const routes: Routes = [{ path: '', component:  FlashcardComponent}];

@NgModule({
  declarations: [FlashcardComponent,FlashcardContentsComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class FlashcardModule { }

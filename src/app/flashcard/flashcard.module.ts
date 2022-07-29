import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardComponent } from './flashcard.component';
import { FlashcardContentsComponent } from './flashcard-contents/flashcard-contents.component';
import { SharedModule } from '../shard/shard.module';

const routes: Routes = [{ path: '', component:  FlashcardComponent}];

@NgModule({
  declarations: [FlashcardComponent,FlashcardContentsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class FlashcardModule { }

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shard/shard.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,  NO_ERRORS_SCHEMA} from '@angular/core';
import { FlachcardListComponent } from './flachcard-list/flachcard-list.component';
import { FlashcardEditComponent } from './flachcard-list/flashcard-edit/flashcard-edit.component';
import { VocabularyEditComponent } from './vocabulary/vocabulary-edit/vocabulary-edit.component';

const routes: Routes = [
  { path: '', component: VocabularyComponent },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'vocabulary/vocabulary-edit', component: VocabularyEditComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'flashcard', component: FlachcardListComponent },
  { path: 'flashcard/edit', component: FlashcardEditComponent },
  
];

@NgModule({
  declarations: [VocabularyComponent,  CategoryComponent, FlachcardListComponent, FlashcardEditComponent, VocabularyEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AdminModule {}

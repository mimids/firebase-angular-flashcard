import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VocabularyListComponent } from './vocabulary-list.component';

const routes: Routes = [{ path: '', component:  VocabularyListComponent}];
@NgModule({
  declarations: [VocabularyListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  
})
export class FlashcardListModule { }

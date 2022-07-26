import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { CardComponent } from './card/card.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shard/shard.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,  NO_ERRORS_SCHEMA} from '@angular/core';

const routes: Routes = [
  { path: '', component: VocabularyComponent },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'card', component: CardComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  declarations: [VocabularyComponent, CardComponent, CategoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AdminModule {}

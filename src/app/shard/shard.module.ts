import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,  NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatCheckboxModule} from '@angular/material/checkbox'

import { ImageDefaultDirective } from './directives/image-default.directive';
import { ApiPathPipe } from './pipes/api-path.pipe';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DialogComponent } from './components/dialog/dialog.component';

const angularModules = [FormsModule, ReactiveFormsModule];
const materialModules = [

  MatCheckboxModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
  CdkTreeModule,
  ReactiveFormsModule


];
const libraryModules = [];

const components = [AvatarComponent,DialogComponent];
const directives = [ImageDefaultDirective];
const pipes = [ApiPathPipe];

@NgModule({
  declarations: [ directives, pipes,components],
  imports: [CommonModule, materialModules],
  exports: [angularModules, materialModules, components, directives, pipes],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

})
export class SharedModule {}

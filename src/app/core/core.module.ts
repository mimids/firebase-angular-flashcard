import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,  NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../../environments/environment';
import { SharedModule } from './../shard/shard.module';

import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { HttpJwtInterceptor } from './interceptor/http-jwt.interceptor';
import { LayoutFooterComponent } from './layout/layout-footer/layout-footer.component';
import { LayoutNavComponent } from './layout/layout-nav/layout-nav.component';
import { LayoutSettingComponent} from './layout/layout-setting/layout-setting.component';
import { LayoutSidenavComponent } from './layout/layout-sidenav/layout-sidenav.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutSettingComponent,
    LayoutFooterComponent,
    LayoutSidenavComponent,
    LayoutNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    SharedModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [LayoutComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

})
export class CoreModule {}

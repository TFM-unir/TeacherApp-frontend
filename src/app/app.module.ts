import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Loader } from '@googlemaps/js-api-loader';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TeacherModule,
    NgxGpAutocompleteModule,
  ],
  providers: [
    {
      provide: Loader,
      useValue: new Loader({
        apiKey: 'AIzaSyDOLYKn6-l2m_NrFC_WgxG5JT-MALF2IYw',
        libraries: ['places'],
      }),
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

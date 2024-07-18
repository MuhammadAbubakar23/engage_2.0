import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './services/SharedService/shared.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { authInterceptorProvider } from './shared/intercepters/auth.interceptor';
import { customInterceptorProvider } from './shared/interceptors';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LayoutsModule } from './layouts/layouts.module';
import { ChatWidget2Component } from './shared/components/chat-widget2/chat-widget2.component';

// import { WordCloudComponent } from './word-cloud/word-cloud.component';

@NgModule({
  declarations: [
    AppComponent,

    // WordCloudComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    LayoutsModule,
  ],
  providers: [SharedService, customInterceptorProvider],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

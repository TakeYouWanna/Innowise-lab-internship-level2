import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { userReducer } from './store/user/user.reducer';
import { UserEffect } from './store/user/user.effect';
import { toastNoticeReducer } from './store/toast-notice/toast-notice.reducer';
import { ToastNoticeEffect } from './store/toast-notice/toast-notice.effect';
import { ToastNoticeComponent } from './shared/components/toast-message/toast-notice.component';

@NgModule({
  declarations: [AppComponent, TopBarComponent, ToastNoticeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    StoreModule.forRoot({ user: userReducer, toastNotice: toastNoticeReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UserEffect, ToastNoticeEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

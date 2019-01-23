import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

const config = {
  apiKey: "AIzaSyBJmrs4Dg6naZ1cL9NRrOzdXSunL5taQU8",
  authDomain: "fs-oauth-b0081.firebaseapp.com",
  databaseURL: "https://fs-oauth-b0081.firebaseio.com",
  projectId: "fs-oauth-b0081",
  storageBucket: "fs-oauth-b0081.appspot.com",
  messagingSenderId: "122215963160"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

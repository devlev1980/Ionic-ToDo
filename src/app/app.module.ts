import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {DashboardPage} from "../pages/dashboard/dashboard";
import {FIREBASE_CREDENTIALS} from "./firebase.credentials";
import {AddTodDoPage} from "../pages/add-tod-do/add-tod-do";
import {EditModalPage} from "../pages/edit-modal/edit-modal";
import {FirebaseService} from "../providers/firebase.service";
import {ToastService} from "../providers/toast.service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    AddTodDoPage,
    EditModalPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    AddTodDoPage,
    EditModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

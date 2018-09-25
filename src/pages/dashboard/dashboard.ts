import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AddTodDoPage} from "../add-tod-do/add-tod-do";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
email: string;
toDoItemsRef$: Observable<any[]>;
// toToListRef$: FirebaseListObservable<ToDoList[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private fireAuth: AngularFireAuth,private db: AngularFireDatabase) {
    this.email = this.fireAuth.auth.currentUser.email;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DashboardPage');
  }
  navigateToAddToDo(){
    this.navCtrl.push(AddTodDoPage)
  }

}

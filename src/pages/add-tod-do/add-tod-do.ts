import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Item} from "../../assets/models/item.interface";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";

/**
 * Generated class for the AddTodDoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-tod-do',
  templateUrl: 'add-tod-do.html',
})
export class AddTodDoPage {
  toDoItem = {} as Item;
  toDoItemsRef$: Observable<any[]>;
  status = [
    'completed', 'in progress', 'removed'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private db: AngularFireDatabase) {
     this.toDoItemsRef$ = this.db.list<Item>('todo-list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTodDoPage');
  }

  onAddItem(item: Item) {
    // console.log(item);
    this.toDoItemsRef$.push(item);
    this.toDoItem = {} as Item;
    this.navCtrl.pop()
  }

}

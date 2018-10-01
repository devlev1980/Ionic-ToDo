import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Item} from "../../assets/models/item.interface";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../../providers/firebase.service";
import {DashboardPage} from "../dashboard/dashboard";
import {ToastService} from "../../providers/toast.service";
import {ItemsService} from "../../providers/items.service";

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
  toDoItemsRef$;
  status = [
    'completed', 'in progress', 'removed'
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private fbs: FirebaseService,
              private api: ItemsService,
              private toast: ToastService) {
     this.toDoItemsRef$  = this.db.database.ref('todo-list');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTodDoPage');
  }

  // onAddItem(item: Item) {
  //   // console.log(item);
  //   this.toDoItemsRef$.push(item);
  //   this.toDoItem = {} as Item;
  //   this.navCtrl.pop();
  // }
  onAddItem(item:Item){
    this.fbs.addItem(item).then(ref=>{
      this.toast.show(`${item.title} has been added successfully!`,3000);
      this.navCtrl.push(DashboardPage,ref.key);
     // console.log(ref.key)
    })


  }

}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Item} from "../../assets/models/item.interface";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../../providers/firebase.service";
import {DashboardPage} from "../dashboard/dashboard";
import {ToastService} from "../../providers/toast.service";
import {ItemsService} from "../../providers/items.service";

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
  }

  onAddItem(item:Item){

    this.api.addItem(item).subscribe((res)=>{
        this.navCtrl.push(DashboardPage);
         this.toast.show(`${item.title} has been added successfully!`,3000);
    },()=>{
      this.toast.show(`Unexpected error!`,3000);
    })
  }

}

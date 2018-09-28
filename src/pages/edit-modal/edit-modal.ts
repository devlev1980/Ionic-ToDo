import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Item} from "../../assets/models/item.interface";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../../providers/firebase.service";
import {DashboardPage} from "../dashboard/dashboard";
import {ToastService} from "../../providers/toast.service";

/**
 * Generated class for the EditModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalPage {
item: Item;
  status = [
    'completed', 'in progress', 'removed'
  ];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db:AngularFireDatabase,
              private fbs: FirebaseService,
              private toast: ToastService) {
  this.item =this.navParams.get('item');

  }

  ionViewDidLoad() {
  }
  onEditItem(key,item){
    this.fbs.updateItem(key,item).then(()=>{
      this.toast.show(`${item.title} has been updated successfully!`,3000);
      this.navCtrl.push(DashboardPage);
    }).catch(()=>{
      console.log('error');
    })
  }
  onCancel(){
    this.navCtrl.pop()
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from "../../assets/models/item.interface";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../../providers/firebase.service";
import {DashboardPage} from "../dashboard/dashboard";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase,private fbs: FirebaseService) {
  this.item =this.navParams.get('item');
  console.log(this.item)


  }

  ionViewDidLoad() {
    // console.log(this.navParams.get('item'));
  }
  onEditItem(key,item){
    console.log(key,item);
    this.fbs.updateItem(key,item).then(()=>{
      this.navCtrl.push(DashboardPage);
    }).catch(()=>{
      console.log('error');
    })


  }

}

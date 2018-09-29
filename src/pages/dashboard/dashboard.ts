import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AddTodDoPage} from "../add-tod-do/add-tod-do";
import {EditModalPage} from "../edit-modal/edit-modal";
import {FirebaseService} from "../../providers/firebase.service";
import {Observable} from "rxjs/Observable";
import {Item} from "../../assets/models/item.interface";
import {map} from "rxjs/operators";
import {ToastService} from "../../providers/toast.service";
import * as _ from 'underscore/underscore'

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
  toDoItemsRef$: Observable<Item[]>;
  sortByOptions = ['Title', 'Date', 'Status'];
  options;
  sortBy: string;
  list: any [];
  sortedList: any[];
  isSorting: boolean = false;

  ionViewDidLoad() {
    console.log(this.navParams.get('item'));
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fireAuth: AngularFireAuth,
              private fbs: FirebaseService,
              private toast: ToastService,
              private modal: ModalController) {
    this.email = this.fireAuth.auth.currentUser.email;

    this.toDoItemsRef$ = this.fbs.getItems().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));

      })
    )

  }


  navigateToAddToDo() {
    this.navCtrl.push(AddTodDoPage)
  }

  onEdit(item) {
    this.modal.create(EditModalPage, {item: item}).present()
  }

  onDelete(id, item) {
    this.fbs.removeItem(id).then(() => {
      this.toast.show(`${item.title} has been removed successfully!`, 3000);
    })

  }

  onSortBy(event) {
    this.isSorting = true;
    this.toDoItemsRef$.subscribe(data => {
      this.list = data;
      if (this.sortBy = 'Title') {
        this.sortedList = _.sortBy(this.list,'title');
      }
      else if (this.sortBy = 'Status') {
        this.sortedList = _.sortBy(this.list, 'status');
      }
     else if (this.sortBy = 'Date') {
        this.sortedList = _.sortBy(this.list, 'date');
      }


    })
  }

}

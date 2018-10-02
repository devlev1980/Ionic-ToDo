import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AddTodDoPage} from "../add-tod-do/add-tod-do";
import {EditModalPage} from "../edit-modal/edit-modal";
import {Item} from "../../assets/models/item.interface";
import {ToastService} from "../../providers/toast.service";
import * as _ from 'underscore/underscore'
import {ItemsService} from "../../providers/items.service";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  email: string;
  toDoItems: Item[];
  sortByOptions = ['Title', 'Date', 'Status'];
  options;
  sortBy: string;
  list;
  sortedList: any[] = [];
  isSorting: boolean = false;

  ionViewDidLoad() {
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fireAuth: AngularFireAuth,
              private toast: ToastService,
              private api: ItemsService,
              private modal: ModalController) {
    this.email = this.fireAuth.auth.currentUser.email;
    this.getItems()


  }

  getItems() {
    this.api.getItems().subscribe(data => {
      this.toDoItems = data
    })
  }

  navigateToAddToDo() {
    this.navCtrl.push(AddTodDoPage)
  }

  onEdit(item) {
    this.modal.create(EditModalPage, {item: item}).present()
  }

  onDelete(id, item) {

    this.api.removeItem(id).subscribe(() => {
      this.getItems();
      this.toast.show(`${item.title} has been removed successfully!`, 3000);

    }, () => {
      this.toast.show(`Unexpected error!`, 3000);
    })
  }
  onSortBy() {
    this.isSorting = true;
    this.toDoItems.forEach(() => {
      switch (this.sortBy) {
        case  "Title":
          this.sortedList = _.sortBy(this.toDoItems, 'title');
          break;
        case "Status":
          this.sortedList = _.sortBy(this.toDoItems, 'status');
          break;
        case "Date":
          this.sortedList = _.sortBy(this.toDoItems, 'date');
          break
      }

    });
  }

}

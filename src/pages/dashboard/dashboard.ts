import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AddTodDoPage} from "../add-tod-do/add-tod-do";
import {AngularFireDatabase} from "@angular/fire/database";
import {EditModalPage} from "../edit-modal/edit-modal";
import {FirebaseService} from "../../providers/firebase.service";
import {Observable} from "rxjs";
import {Item} from "../../assets/models/item.interface";
import {map} from "rxjs/operators";
import {ToastService} from "../../providers/toast.service";

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
  toDoItemsRef$ : Observable<Item[]>;
  list;
  toDos

  ionViewDidLoad() {
    console.log(this.navParams.get('item'));
  }

// toToListRef$: FirebaseListObservable<ToDoList[]>
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fireAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private fbs: FirebaseService,
              private toast: ToastService,
              private modal: ModalController) {
    this.email = this.fireAuth.auth.currentUser.email;
    // this.toDoItemsRef$ = db.list('/todo-list').valueChanges().subscribe(data => {
    //   this.list = data;
    // });
    // this.toDos = db.list('/todo-list')
    this.toDoItemsRef$ = this.fbs.getItems().snapshotChanges().pipe(
      map(changes=>{
        return changes.map(c=>({
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

  onDelete(id,item) {
    this.fbs.removeItem(id).then(()=>{
      this.toast.show(`${item.title} has been removed successfully!`,3000);
    })

  }

}

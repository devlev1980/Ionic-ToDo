import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/database";
import {Item} from "../assets/models/item.interface";


@Injectable()
export class FirebaseService {

  private toDos$ = this.db.list<Item>('todo-list');
  constructor(private db: AngularFireDatabase) {


  }
  getItems(){
    return this.toDos$;
  }
  addItem(item: Item){
    return this.toDos$.push(item)
  }
  updateItem(key,item: Item){
    return this.toDos$.update(key,item)
  }
  removeItem(item:Item){
  }

}

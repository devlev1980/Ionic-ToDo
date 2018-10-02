import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Item} from "../assets/models/item.interface";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class ItemsService {
  url = 'http://localhost:3000/items';
  items = {} as Item[];

  constructor(private http: HttpClient){}

  getItems() : Observable<Item[]>{
    return this.http.get<Item[]>(this.url);
  }
  addItem(item){
    return this.http.post(this.url,item)
  }
  editItem(id,item){
    const url  = this.url + '/'+id;
    const updatedItem = {
      id: id,
      title: item.title,
      description: item.description,
      date: item.date,
      status: item.status
    };
    return this.http.put(url,updatedItem);
  }
  removeItem(id){
    const url  = this.url + '/'+id;
    return this.http.delete(url,id);
  }

}

import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {
  constructor(private toastController: ToastController){

  }
  show(message: string,duration: number){
    return this.toastController.create({
   message,
     duration
    }).present()
  }
}

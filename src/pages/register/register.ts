import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {DashboardPage} from "../dashboard/dashboard";


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebase: AngularFireAuth,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string){
    this.alertCtrl.create({
      title:'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present()
  }
  signUpUser(){
    console.log(`Would sign up with username: ${this.email.value} and password:${this.password.value} `)
    this.firebase.auth.createUserWithEmailAndPassword(this.email.value,this.password.value).then(()=>{
        this.alert('Ypu\'re successfully registered!')
        this.navCtrl.push(DashboardPage)
    }).catch(error=>{
      console.log('Something went wrong',error)
    })
  }

}

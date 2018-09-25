import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {DashboardPage} from "../dashboard/dashboard";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fireAuth: AngularFireAuth) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  alert(message: string){
    this.alertCtrl.create({
     title:'Info',
      subTitle: message,
      buttons: ['OK']
    }).present()
  }


  signInUser() {
    console.log(`Would sign in with username: ${this.email.value} and password:${this.password.value} `)
this.fireAuth.auth.signInWithEmailAndPassword(this.email.value,this.password.value).then((data)=>{
  if(data){
    this.alert('You\'re logged in successfully');
    this.navCtrl.push(DashboardPage)
  }else{
    return false;
  }
  // console.log(data);


}).catch(error=>{
  console.log('Error',error);
  this.alert('Error');
});


  }

}

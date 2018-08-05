import {Component} from '@angular/core';
import {NavController, NavParams, Loading, AlertController, LoadingController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {RegisterPage} from '../register/register';
import {TopicMenu} from '../topic-menu/topic-menu';

@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {
  loading : Loading;
  registerCredentials = {
    email: 'hoc2@tcd.ie',
    password: 'deniseho'
  };

  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams, 
    private auth : AuthServiceProvider, 
    private alertCtrl : AlertController, 
    private loadingCtrl : LoadingController) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount() {
    this
      .navCtrl
      .push(RegisterPage);
  }

  login() {
    this.showLoading();
    this
      .auth
      .login(this.registerCredentials)
      .subscribe(allowed => {
        if (allowed) {
            this
            .navCtrl
            .setRoot(TopicMenu);
        } else {
          this.showError("Access Denied");
        }
      }, error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this
      .loadingCtrl
      .create({content: 'Please wait...', dismissOnPageChange: true});
    this
      .loading
      .present();
  }

  showError(text : any) {
    this
      .loading
      .dismiss();
    let alert = this
      .alertCtrl
      .create({title: 'Fail', subTitle: text, buttons: ['OK']});
    alert.present();
  }

}

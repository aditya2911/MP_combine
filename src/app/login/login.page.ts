import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
myLogin!:FormGroup
  constructor(private fb:FormBuilder,private auth:Auth,private router:Router,private alertController:AlertController) { }

  ngOnInit() {
    this.myLogin = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]]
    })
  }

  navigateTo(path:string){
    this.router.navigateByUrl(path);
  }

  async presentAlert(){
    const a = this.alertController.create(
      {
        header:"Authentication Failed",
        subHeader:"Invalid User Credentials",
        buttons:["Ok"]
      }
    )

    await (await a).present();
  }

  async login(){
    try{
      let email = this.myLogin.get('email')!.value;
      let password =this.myLogin.get('password')!.value;
      console.log(email,password);
      const user = await signInWithEmailAndPassword(this.auth,email,password);
      console.log(user);
      if(user){
        this.router.navigateByUrl("tabs");
      }
    }
    catch (e){
    console.log(e);


this.presentAlert()    }
  
  }

}

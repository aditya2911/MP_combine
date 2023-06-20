import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  myForm!: FormGroup;
  constructor(private fb:FormBuilder,private alertController:AlertController,private auth:Auth) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email:['', [Validators.required,Validators.email]],
      name:['',[Validators.required]],
      password:['',[Validators.required],],
    })
  }

  async presentAlert(){
    const a = this.alertController.create(
      {
        header:"Sign Up Failed",
        subHeader:"Error Occured",
        buttons:["Ok"]
      }
    )

    await (await a).present();
  }

  async submitForm() {
    if (this.myForm.valid) {
      try {
        let email = this.myForm.get('email')!.value;
        let password = this.myForm.get('password')!.value;
        console.log(email, password);
        const user = await createUserWithEmailAndPassword(this.auth, email, password);
        console.log(user);
      //  return user;
      } catch (e) {
        console.error(e);
        this.presentAlert();
//return null;
      }
    }
  }
}

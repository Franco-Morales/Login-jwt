import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerFormGroup: FormGroup;


  constructor(
    private formBuilderSvc: FormBuilder, 
    private authSvc: AuthService, 
    private router: Router,
    private toastSvc: ToastService
  ) { 
    this.registerFormGroup = this.buildRegisterForm();
  }

  ngOnInit(): void { }


  public async onRegister(e: Event) {
    e.preventDefault();
    let { email, password, username } = this.registerFormGroup.value;

    if(this.registerFormGroup.valid) {
      try {
        const resp = await lastValueFrom(this.authSvc.signUp(email, password, username));
        if(resp) {
          this.toastSvc.toast("Please login","info");
          this.router.navigate(["/loggin"]);
        }
        
      } catch (err: any) {
        let { errors } = err.error;
        if(errors?.email.param) this.email?.setErrors({ repeated: true });
      }
    }
  }

  private buildRegisterForm() {
    return this.formBuilderSvc.group({
      email: ["", [ Validators.required, Validators.email ]],
      password: ["", [ Validators.required, Validators.minLength(8), Validators.maxLength(16) ]],
      username: ["", [ Validators.required, Validators.minLength(4),Validators.maxLength(16) ]]
    });
  }


  get email() {
    return this.registerFormGroup.get("email");
  }
  get password() {
    return this.registerFormGroup.get("password");
  }
  get username() {
    return this.registerFormGroup.get("username");
  }
}
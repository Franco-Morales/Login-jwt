import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent implements OnInit {

  public logginFormGroup: FormGroup;


  constructor(
    private formBuilderSvc: FormBuilder, 
    private authSvc: AuthService, 
    private router: Router,
    private toastSvc: ToastService
  ) { 
    this.logginFormGroup = this.buildLoginForm();
  }

  ngOnInit(): void { }


  public async onLogin(e: Event) {
    e.preventDefault();
    let { email, password } = this.logginFormGroup.value;

    if(this.logginFormGroup.valid) {
      try {
        const resp = await lastValueFrom(this.authSvc.loggIn(email, password));

        if(resp) {
          this.toastSvc.toast("Success Loggin !", "success");
          this.router.navigate([""]);
        }
        
      } catch (err: any) {
        let { errors } = err.error;
        if( errors?.email ) this.email?.setErrors({ notFound: true });
        if( errors?.password ) this.password?.setErrors({ notMatchPwd: true });
      }
    }
  }

  private buildLoginForm() {
    return this.formBuilderSvc.group({
      email: ["", [ Validators.required, Validators.email ]],
      password: ["", [ Validators.required, Validators.minLength(8), Validators.maxLength(16) ]]
    });
  }


  get email() {
    return this.logginFormGroup.get("email");
  }
  get password() {
    return this.logginFormGroup.get("password");
  }
}

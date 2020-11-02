import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {AuthenticationService, HelperService, LoaderService} from '../../../services';
import {StaffService} from '../../staff/staff.service';


@Component({
  templateUrl: 'reset.component.html',
})
export class ResetComponent implements OnInit {
  public userForm: FormGroup;
  localUser = HelperService.getLocalUser();
  public id;
  userData = [];
  token;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private userService: StaffService,
              private _toasterService: ToastrService,
              private _activatedRouter: ActivatedRoute,
              private _helperService: HelperService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],

    });
    this.token = this._activatedRouter.snapshot.params['token'];
    console.log(this.token);
    if (this.token) {
      this.geFindByToken(this.token);
    }
  }



  geFindByToken(token) {
    this.authService.geFindByToken(token).subscribe(response => {
      this.userData = response['data'];
      console.log(response['data']['email']);
      this.userForm.get('email').disable();
      this.userForm.get('email').setValue(response['data']['email']);
    }, (error) => {
      console.log(error);
      this.router.navigate(['auth', 'login']);
      this._toasterService.error(error.error.message, 'Failed');

    });
  }

  saveUser() {
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      const userValues = this.userForm.value;
      const postValues = HelperService.createFormData(userValues);

      LoaderService.show();
      if (this.token) {
          postValues.append('email', this.userData['email']);
          postValues.append('token', this.userData['token']);
        this.authService.resetPw(postValues)
          .subscribe((response) => {
            LoaderService.hide();
            this._toasterService.success('reset password successfully', 'Success');
            this.cancel();
          }, (e) => {
            LoaderService.hide();
            this.setServeErrors(e.error);
            this._toasterService.error('reset password failed', 'Failed');
          });
      }
    }
  }

  setServeErrors(errorResponse) {
    for (const controlKey of Object.keys(errorResponse.errors)) {
      this.userForm.get(controlKey).setErrors({serverErrors: errorResponse.errors[controlKey]});
    }
  }

  cancel() {
    this.router.navigate(['auth', 'login']);
  }

}

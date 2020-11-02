import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {AuthenticationService, HelperService, LoaderService} from '../../../services';
import {StaffService} from '../../staff/staff.service';


@Component({
  templateUrl: 'forget.component.html',
})
export class ForgetComponent implements OnInit {
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

    });
  }


  saveUser() {
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      const userValues = this.userForm.value;
      const postValues = HelperService.createFormData(userValues);

      LoaderService.show();
        this.authService.forgetPw(postValues)
          .subscribe((response) => {
            LoaderService.hide();
            this._toasterService.success('check your email for password reset', 'Success');
            this.cancel();
          }, (e) => {
            LoaderService.hide();
            this.setServeErrors(e.error);
            this._toasterService.error('forget password failed', 'Failed');
          });
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

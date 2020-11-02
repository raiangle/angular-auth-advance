import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {StaffService} from '../staff.service';
import {HelperService, LoaderService} from '../../../services';

@Component({
  templateUrl: 'staff-reset-pw.component.html',
})
export class StaffResetPwComponent implements OnInit {
  areasList = [];

  public userForm: FormGroup;
  public id;
  public sub;

  area = null;

  public prevImages = [];
  public systemCategories = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private _toasterService: ToastrService,
              private userService: StaffService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, [Validators.required]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.getUserById(this.id);
      }
    });


  }
  getUserById(id) {
    this.userService.getUserById(id).subscribe(response => {
      this.userForm.get('email').setValue(response['data']['email']);
    }, error => {
    });
  }


  cancel() {
    this.router.navigate(['/', 'staff']);
  }

  addPw() {

    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {

      const formDatas = HelperService.createFormData(this.userForm.value);

      if (this.id) {
        LoaderService.show();
        this.userService.resetPwUser(this.id, formDatas).subscribe(response => {
          LoaderService.hide();
          if (response['status'] === 'success') {
            this._toasterService.success('Reset Password Success', 'Success');
            this.cancel();
          }
        }, (error) => {
          LoaderService.hide();
          this.setServeErrors(error.error);
          this._toasterService.error('Reset Password Failed', 'Failed');
        });
      }
    }
  }

  setServeErrors(errorResponse) {
    for (const controlKey of Object.keys(errorResponse.errors)) {
      this.userForm.get(controlKey).setErrors({serverErrors: errorResponse.errors[controlKey]});
    }
  }

}

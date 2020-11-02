import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {AuthenticationService, HelperService, LoaderService} from '../../../services';
import {StaffService} from '../staff.service';

@Component({
  templateUrl: 'staff-form.component.html',
})
export class StaffFormComponent implements OnInit {
  public userForm: FormGroup;
  localUser = HelperService.getLocalUser();
  public id;
  public role_name;
  rolesList = [];
  agencyList = [];
  userData = [];
  showAgency = true;
  msgName;
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
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      mobile: [null, Validators.required],
      user_address: [null],
      role_name: [null],
      agency_id: [null],
    });
    this.id = +this._activatedRouter.snapshot.params['id'];
    this.role_name = this._activatedRouter.snapshot.parent.data['role_name'];
    if (this.localUser['roles'][0]['name'] === 'Agency Owner' || this.localUser['roles'][0]['name'] === 'Staff') {
      this.showAgency = false;
      this.userForm.get('agency_id').setValidators(null);
      this.userForm.get('agency_id').setValue(this.localUser['agency_id']);
    } else {
      // if (this.role_name === 'client') {
      //   this.showAgency = false;
      //   this.userForm.get('agency_id').setValidators(null);
      // } else {
        this.showAgency = true;
        this.userForm.get('agency_id').setValidators(Validators.required);
      // }
    }
    this.userForm.get('agency_id').updateValueAndValidity();
    this.getAllRoles();
    if (this.id) {
      this.getUserById(this.id);
    } else {
      // this.userForm.addControl('password', this.formBuilder.control(null, Validators.required));
    }
  }


  getAllRoles() {
    LoaderService.show();
    this.userService.getAllRoles().subscribe(response => {
      this.rolesList = response['data']['roles'];
      this.rolesList.splice(0, 2);
      this.agencyList = response['data']['agency'];
      LoaderService.hide();
    }, error => {
      LoaderService.hide();
    });
  }

  getUserById(id) {
    this.userService.getUserById(id).subscribe(response => {
      this.userData = response['data'];

      // tslint:disable-next-line:forin
      for (const field in this.userForm.controls) {
        this.userForm.get(field).setValue(response['data'][field]);
      }
    }, error => {
    });
  }

  saveUser() {
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      if (this.role_name === 'staff') {
        this.msgName = 'Staff';
        this.userForm.get('role_name').setValue('Staff');
      } else {
        this.msgName = 'Pet Owner';
        this.userForm.get('role_name').setValue('Pet Owner');
      }

      const userValues = this.userForm.value;

      const postValues = HelperService.createFormData(userValues);

      LoaderService.show();
      if (this.id) {
        this.userService.updateUser(this.id, postValues)
          .subscribe((response) => {
            LoaderService.hide();
            this._toasterService.success(this.msgName + ' Updated', 'Success');
            this.cancel();
          }, (e) => {
            LoaderService.hide();
            this.setServeErrors(e.error);
            this._toasterService.error(this.msgName + ' Update Failed', 'Failed');
          });
      } else {
        this.userService.saveUser(postValues).subscribe(response => {
          LoaderService.hide();
          if (response['status'] === 'success') {
            this._toasterService.success(this.msgName + ' Added', 'Success');
            this.cancel();
          }
        }, (e) => {
          console.log(e);
          LoaderService.hide();
          this.setServeErrors(e.error);
          this._toasterService.error(this.msgName + ' Add Failed', 'Failed');
        });
      }
    }
  }

  setServeErrors(errorResponse) {
    for (const controlKey of Object.keys(errorResponse.errors)) {
      console.log(controlKey);
      console.log(errorResponse.errors[controlKey]);
      this.userForm.get(controlKey).setErrors({serverErrors: errorResponse.errors[controlKey]});
    }
  }

  cancel() {
    if (this.role_name === 'client') {
      this.router.navigate(['/', 'pet-owner']);
    } else {
      this.router.navigate(['/', 'staff']);
    }
  }

}

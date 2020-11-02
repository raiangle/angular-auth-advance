import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {StaffService} from '../staff.service';
import {AuthenticationService, HelperService, LoaderService} from '../../../services';

@Component({
  templateUrl: 'staff-view.component.html',
})
export class StaffViewComponent implements OnInit {
  public userForm: FormGroup;

  public statusOptions = [
    {label: 'Pending', value: 0},
    {label: 'Approved', value: 1},
    {label: 'Rejected', value: 2},
    {label: 'Suspended', value: 3},
  ];
  public id;

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
      first_name: [{value: '', disabled: true}, Validators.required],
      last_name: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, [Validators.email, Validators.required]],
      mobile: [{value: '', disabled: true}, Validators.required],
    });
    this.id = +this._activatedRouter.snapshot.params['id'];

    if (this.id) {
      this.getUserById(this.id);
    } else {
      this.userForm.addControl('password', this.formBuilder.control(null, Validators.required));
    }
  }

  getUserById(id) {
    LoaderService.show();
    this.userService.getUserById(id).subscribe(response => {
      LoaderService.hide();
      this.userForm.addControl('id', this.formBuilder.control(['', Validators.required]));
      // tslint:disable-next-line:forin
      for (const field in this.userForm.controls) {
        this.userForm.get(field).setValue(response['data'][field]);
      }
    }, error => {
      LoaderService.hide();
    });
  }

  setServeErrors(errorResponse) {
    for (const controlKey of Object.keys(errorResponse.errors)) {
      this.userForm.get(controlKey).setErrors({serverErrors: errorResponse.errors[controlKey]});
    }
  }

  cancel() {
    this.router.navigate(['/', 'staff']);
  }

}

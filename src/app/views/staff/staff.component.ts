import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {DatatableService, HelperService} from '../../services';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'staff.component.html',
})
export class StaffComponent implements OnInit, AfterViewInit, OnDestroy {
  users: any = [];
  role_name;
  localUser;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  role;
  columnDynamic;

  constructor(private datatableService: DatatableService,
              private helperService: HelperService,
              private _activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.role_name = this._activatedRouter.snapshot.parent.data['role_name'];
    this.localUser = HelperService.getLocalUser();
    this.getAllUsers();
    if (this.role_name === 'staff') {
      HelperService.setBreadcumTitle('Staff');
    } else {
      HelperService.setBreadcumTitle('PetOwner');
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAllUsers() {
    if (this.role_name === 'staff') {
      this.role = 'Staff';
    } else {
      this.role = 'Pet Owner';
    }
    if (this.localUser['roles'][0]['name'] === 'Admin') {
      this.columnDynamic = [
        {name: 'email', orderable: false},
        {name: 'agency.name', orderable: false},
        {name: 'id', orderable: false}
      ];
    } else {
      this.columnDynamic = [
        {name: 'email', orderable: false},
        {name: 'id', orderable: false}
      ];
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      lengthMenu: [5, 10, 25, 50],
      serverSide: true,
      searchDelay: 1000,
      processing: true,
      language: {
        searchPlaceholder: 'Search...',
        search: ''
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.datatableService.getTableData(dataTablesParameters, 'staff/list/' + this.role).subscribe(resp => {
          this.users = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      order: [],
      columns: this.columnDynamic
    };
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { StorageManagerService } from './';

@Injectable()
export class DatatableService {
  constructor(private http: HttpClient) {
  }

  getTableData(dataTablesParameters, url) {
    return this.http.post<DataTablesResponse>(environment.api_url + url, dataTablesParameters);
  }
  
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

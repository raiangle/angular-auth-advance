import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable()
export class StaffService {

  constructor(private http: HttpClient) {
  }

  getUserById(id) {
    return this.http.get<any>(environment.api_url + 'staff/' + id);
  }
  getAllRoles() {
    return this.http.get<any>(environment.api_url + 'staff/roles');
  }
  updateUser(id, postVal) {
    return this.http.post<any>(environment.api_url + 'staff/update/' + id, postVal);
  }
  saveUser(postVal) {
    return this.http.post<any>(environment.api_url + 'staff/add', postVal);
  }
  resetPwUser(id, value) {
    return this.http.post<any>(environment.api_url + 'staff/reset-pw/' + id, value);
  }
}

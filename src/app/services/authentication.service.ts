import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post<any>(environment.api_url + 'login', user);
  }
  resetPw(postVal) {
    return this.http.post<any>(environment.api_url + 'password/reset', postVal);
  }
  forgetPw(postVal) {
    return this.http.post<any>(environment.api_url + 'password/forget', postVal);
  }
  geFindByToken(token) {
    return this.http.get<any>(environment.api_url + 'password/find/' + token);
  }
}

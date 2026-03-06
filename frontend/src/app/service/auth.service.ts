import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class AuthService {

  
  private static COOKIE_NAME = 'JSESSIONID';

  private static KEY_LOCALSTORE = 'pipers';

  private storage: any = localStorage;


  constructor(private http: HttpClient) { }


  public isLoggedIn(): boolean {
    let user = undefined;
    if (!user) {
      user = JSON.parse(this.storage.getItem(AuthService.KEY_LOCALSTORE));
    }
    return user != null;
  }

  public backendLogIn(): any {
   
  }

//   public hasAnyRole(): boolean {
//     return this.getUser().roles != null && this.getUser().roles !== '';
//   }

//   hasRole(role: string): boolean {
//     return this.getUser().roles.includes(role);
//   }


//   public getUser(): User {
//     return JSON.parse(this.storage.getItem(AuthService.KEY_LOCALSTORE));
//   }

//   public getUserRol(): String {
//     const usr = JSON.parse(this.storage.getItem(AuthService.KEY_LOCALSTORE)) as User;
//     let rolUser: string = null;
//     if (usr) {
//       rolUser = usr.roles;
//     }
//     return rolUser;
//   }

 





  public logout(): void {
    this.storage.removeItem(AuthService.KEY_LOCALSTORE);
    window.location.href = './logout';
  }

//   getVersion(): Observable<any> {
//     return this.http.get('version', { responseType: 'text', observe: 'response' });
//   }



}

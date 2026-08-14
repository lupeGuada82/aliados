import { Component } from '@angular/core';
import { HelloService } from './hello/hello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  mensaje='';
 menuVisible: boolean = true;
   
  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
    this.helloService.hello().subscribe(resp => {
      console.log('Respuesta del servicio hello(): ', resp);
      this.mensaje = resp;
    });
  }



  currentState = 'initial';

  cambioEstadoSideBar($event: any) {
    this.currentState = $event;
    let routeo = document.getElementById('routeo');
    if (this.currentState == 'initial') {
      routeo?.setAttribute('style', 'width:100%');
    }
    else {
      routeo?.setAttribute('style', 'padding-left: 170px;  width:100%');
    }
  }


  isLoggedIn(): boolean {
    return true;//this.authService.isLoggedIn();
  }

  hasAnyRole(): boolean {
    return true;//this.authService.hasAnyRole();
  }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/']);
  }

  // getUser() {
  //   return this.authService.getUser();
  // }
  
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;


  }
}


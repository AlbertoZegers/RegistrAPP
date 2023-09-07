import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_password: string = '';
  uni_usuario: string = '';
  uni_password: string = '';

  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state){
      this.uni_usuario =parametros?.extras.state['user'];
      this.uni_password=parametros?.extras.state['pass'];
    }
  }

  navegar() {
    if(this.mdl_usuario == this.uni_usuario && this.mdl_password == this.uni_password){
      
      let parametros: NavigationExtras = {
        state: {
          user: this.mdl_usuario,
          pass: this.mdl_password
        },
        replaceUrl: true
      }

      this.router.navigate(['inicio'], parametros);
    } else {
      this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }


registrar() { 
  let parametros: NavigationExtras = {
    replaceUrl: true
  }
      this.router.navigate(['usuario']);
      
}

recuperar() { 
  let parametros: NavigationExtras = {
    replaceUrl: true
  }
  this.router.navigate(['recuperacion']);
  
}
}
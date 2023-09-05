import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegar() {
    if(this.mdl_usuario == '' && this.mdl_contrasena == ''){
      
      let parametros: NavigationExtras = {
        state: {
          user: this.mdl_usuario,
          pass: this.mdl_contrasena
        }
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
      this.router.navigate(['usuario']);
}

recuperar() { 
  this.router.navigate(['recuperacion']);
}
}
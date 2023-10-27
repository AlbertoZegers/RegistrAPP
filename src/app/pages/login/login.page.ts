import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_password: string = '';

  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  async navegar() {
    if(this.apiService.loginPersona(this.mdl_usuario, this.mdl_password)){
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
      this.router.navigate(['usuario'], parametros);
      
}

recuperar() { 
  let parametros: NavigationExtras = {
    replaceUrl: true
  }
  this.router.navigate(['recuperacion'], parametros);
}
}
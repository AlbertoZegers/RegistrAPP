import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService, LoginService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';

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

  constructor(private router: Router, private apiService: ApiService, private loginService: LoginService) { }
  
  ngOnInit() {
  }

  async navegar() {
    let data = this.apiService.loginPersona(this.mdl_usuario, this.mdl_password);
    let respuesta = await lastValueFrom(data);
    let valorAcceso:any = JSON.stringify(respuesta);  
    console.log(valorAcceso)
    let accesoConcedido: any = JSON.stringify({"result":[{"RESPUESTA":"LOGIN OK"}]})
    if(valorAcceso == accesoConcedido){
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
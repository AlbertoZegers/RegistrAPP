import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  mdl_usuario: string = '';
  mdl_password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
  }

  crear() {
    let parametros: NavigationExtras = {
      state: {
        user: this.mdl_usuario,
        pass: this.mdl_password,
        },
        replaceUrl: true
      }
      this.router.navigate(['login'], parametros);
  }
}

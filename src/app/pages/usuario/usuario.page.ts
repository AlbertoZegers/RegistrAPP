import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  mdl_usuario: string = '';
  mdl_correo: string = '';
  mdl_password: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
  }

  crear() {
    this.apiService.almacenarPersona(
      this.mdl_usuario, this.mdl_correo, this.mdl_password, this.mdl_nombre, this.mdl_apellido)
    let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['login'], parametros);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { DbService } from 'src/app/services/db.service';

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

  constructor(private router: Router, private apiService: ApiService, private db: DbService) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
  }

  async crear() {
    let data = this.apiService.almacenarPersona(
      this.mdl_usuario, this.mdl_correo, this.mdl_password, this.mdl_nombre, this.mdl_apellido)
    let respuesta = await lastValueFrom(data);
    let estadoPersona = JSON.stringify(respuesta)  
    console.log(estadoPersona) 
    let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['login'], parametros);
  }
}

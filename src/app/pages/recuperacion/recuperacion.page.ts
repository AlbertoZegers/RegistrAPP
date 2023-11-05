import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  mdl_usuario: string = '';
  mdl_newpassword: string = '';
  mdl_password: string = '';

  constructor(private router: Router, private apiService: ApiService, private db: DbService) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
  }
  async modificar() {
    let data = this.apiService.modificarPassPersona(this.mdl_usuario, this.mdl_newpassword, this.mdl_password)
    let respuesta = await lastValueFrom(data);
    let estadoModificarCuenta = JSON.stringify(respuesta)
    console.log(estadoModificarCuenta)
    this.db.recuperarContrasena(this.mdl_usuario, this.mdl_newpassword, this.mdl_password)
      let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['login'], parametros);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  mdl_usuario: string = '';
  mdl_newpassword: string = '';
  mdl_password: string = '';

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
  }
  modificar() {
    this.apiService.modificarPassPersona(this.mdl_usuario, this.mdl_newpassword, this.mdl_newpassword)
      let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['login'], parametros);
  }
}

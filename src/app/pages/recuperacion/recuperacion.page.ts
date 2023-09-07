import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

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
  modificar() {
      let parametros: NavigationExtras = {
        state: {
          pass: this.mdl_password,
          replaceUrl: true
        }
      }
      this.router.navigate(['principal'], parametros);
  }
}

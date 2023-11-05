import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  usuario: string = '';
  password: string = '';

  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();

    if(parametros?.extras.state) {
      this.usuario = parametros?.extras.state['user'];
      this.password = parametros?.extras.state['pass'];
  }
 /* this.infoUsuario();*/
}
  /*infoUsuario(){
    this.db.infoUsario(this.usuario, this.password)
    .then(data => {
      this.correo = data.correo;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
    })
  }*/
  volver() {
    this.db.CerrarSesion()
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
    
  }
}

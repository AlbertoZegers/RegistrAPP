import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php"

  urlQR="https://fer-sepulveda.cl/API_PRUEBA_3/api-service.php"

  constructor(private http: HttpClient) { }

  asistenciaAlmacenar(usuario: string, asignatura: string, seccion: string, fecha: string){
    return this.http.post(this.urlQR, {
      nombreFuncion: "asistenciaAlmacenar",
      parametros: [
        usuario, asignatura, seccion, fecha
      ]
    }).pipe()
  }
  asistenciaObtener(usario: string){
    return this.http.get(this.urlQR+'?nombreFuncion=AsistenciaObtener&usuario='+ usario).pipe();
  }

  almacenarPersona(usuario: string, correo: string, contrasena: string, nombre: string, apellido: string){
    return this.http.post(this.url, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [
        usuario, correo, contrasena, nombre, apellido
      ]
    }).pipe()
  }
  loginPersona(usario: string, contrasena: string){
    return this.http.post(this.url, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [
        usario, contrasena
      ]
    }).pipe()
  }
  modificarPassPersona(usuario: string, contrasenaNueva: string, contrasenaActual: string){
    return this.http.patch(this.url, {
      nombreFuncion: 'UsuarioModificarContrasena',
      parametros: [
        usuario, contrasenaNueva, contrasenaActual
      ]
    }).pipe()
  }
}



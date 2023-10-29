import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php"

  constructor(private http: HttpClient) { }

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
export class LoginService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        db.executeSql('create table if not exist USUARIO(USER VARCHAR(32), CONTRASENA VARCHAR(30))', []).then(() => {
          console.log('RA: TABLA CREADA OK');
        })
          .catch(e => {console.log('RA: ERROR');
        })
    
      }).catch(e => {
        console.log('RA: ERROR');
      })
  }
  /*almacenarUsuario(user, contrasena) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        db.executeSql('INSERT INTO USUARIO VALUES(?, ?))', [user, contrasena]).then(() => {
          console.log('RA: USUARIO ALMACENADO OK');
        })
          .catch(e => {console.log('RA: USUARIO NO ALMACENADO');
        })
    
      }).catch(e => {
        console.log('RA: ERROR');
      })
    } 
    esto para almacenar los datos en la base de datos

   recuperarContrasena(user, contrasena) {
      this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        db.executeSql('UPDATE USUARIO CONTRASENA = (?) WHERE USER = (?))').then(() => {
          console.log('RA: CONTRASEÑA RECUPERADA OK');
        })
          .catch(e => {console.log('RA: ERROR');
        })
    
      }).catch(e => {
        console.log('RA: ERROR');
      })
    } 

    }
    */ 
 
}


import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite ) { 
    this.crearTablas();
  } 
    crearTablas(){
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
        
          db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(USUARIO VARCHAR(32) PRIMARY KEY, PASSWORD VARCHAR(30))', [])
          .then(() => console.log('RA: TABLA CREADA OK'))
          .catch(e => console.log('RA: ERROR AL CREAR TABLA: '+ JSON.stringify(e)))
        })
        .catch(e => console.log('RA: '+ JSON.stringify(e)))
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
        
          db.executeSql('CREATE TABLE IF NOT EXISTS SESION(USUARIO VARCHAR(32) PRIMARY KEY, PASSWORD VARCHAR(30))', [])
          .then(() => console.log('RA: TABLA SESION CREADA OK'))
          .catch(e => console.log('RA: ERROR AL CREAR SESION TABLA: '+ JSON.stringify(e)))
        })
        .catch(e => console.log('RA: '+ JSON.stringify(e)))
      }
      
    
    
    almacenarUsuario(usuario: string, password: string) {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
      
        db.executeSql('INSERT INTO USUARIO VALUES(?,?)', [usuario, password])
        .then(() => console.log('RA: USUARIO ALMACENADO OK'))
        .catch(e => console.log('RA: ERROR AL ALMACENAR USUARIO: '+ JSON.stringify(e)))
      })
      .catch(e => console.log('RA: '+ JSON.stringify(e)))
    } 
    
      loginUsario(usuario: string, password: string) {
        return this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          return db.executeSql('SELECT COUNT(USUARIO) as cantidad from USUARIO where USUARIO = ? and PASSWORD = ?', [usuario, password] )
          .then((data) => {
            return data.rows.item(0).cantidad;
            
          })
            .catch(e => console.log('RA: ERROR '+ JSON.stringify(e) + ' AL INICIAR SESION'))
        }).catch(e => console.log('RA: '+JSON.stringify(e)))
      } 
  
      // infoUsario(usuario: string, password: string) {
      //   return this.sqlite.create({
      //   name: 'data.db',
      //   location: 'default'
      // })
      //   .then((db: SQLiteObject) => {
      //     return db.executeSql('SELECT CORREO, NOMBRE, APELLIDO from USUARIO WHERE USUARIO = ? and PASSWORD = ?', [usuario, password] )
      //     .then((data) => {
      //       let objeto: any = {};
      //       objeto.nombre = data.rows.item(0).nombre;
      //       objeto.apellido = data.rows.item(0).apellido;
      //       objeto.correo = data.rows.item(0).correo;
      //       return objeto;
            
      //     })
      //       .catch(e => console.log('RA: ERROR '+ JSON.stringify(e) +' al obtener info'))
      
      //   }).catch(e => console.log('RA: '+JSON.stringify(e)))
      // } 

     recuperarContrasena(usuario: string, nPassword: string, aPassword: string) {
        this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
      
          db.executeSql('update USUARIO set PASSWORD = ? where USUARIO = ? and PASSWORD = ?', [nPassword, usuario, aPassword ])
          .then(() => {
            console.log('RA: CONTRASEÑA RECUPERADA OK');
          })
            .catch(e => console.log('RA: ERROR '+ JSON.stringify(e)))
      
        }).catch(e => console.log('RA: '+JSON.stringify(e)))
      } 
  
      
      almacenarSesion(usuario: string, password: string) {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
        
          db.executeSql('insert into SESION values(?,?)', [usuario, password])
          .then(() => console.log('RA: SESION ALMACENADO OK'))
          .catch(e => console.log('RA: ERROR AL ALMACENAR SESION: '+ JSON.stringify(e)))
        })
        .catch(e => console.log('RA: ERROR '+JSON.stringify(e)))
      } 

      validarSesion() {
      return this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          return db.executeSql('select count(USUARIO) as cantidad from SESION', [] )
          .then((data) => {
            return data.rows.item(0).cantidad;
            
          })
            .catch(e => console.log('RA: ERROR '+ JSON.stringify(e) +' AL INICIAR SESION'))
        }).catch(e => console.log('RA: ERROR '+ JSON.stringify(e)))
      }
      CerrarSesion(){
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
        
        
            db.executeSql('DELETE FROM SESION', [])
              .then(() => console.log('FSR: PERSONA Borrada'))
              .catch(e => console.log('FSR: ' + JSON.stringify(e)));
        
        
          })
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      } 
    } 





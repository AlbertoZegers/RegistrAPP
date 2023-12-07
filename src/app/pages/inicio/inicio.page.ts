import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  asistencias: any[] = []; 
  
  usuario: string = '';
  password: string = '';

  constructor(private router: Router, private db: DbService, private alertController: AlertController, private apiService: ApiService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();

    if(parametros?.extras.state) {
      this.usuario = parametros?.extras.state['user'];
      this.password = parametros?.extras.state['pass'];
  }
  BarcodeScanner.isSupported().then((result) => {
    this.isSupported = result.supported;
  });
  this.verAsistencia();
}
  volver() {
    this.db.CerrarSesion()
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros); 
    
  }

  async verAsistencia(){
    let data = this.apiService.asistenciaObtener(this.usuario);
    let respuesta = await lastValueFrom(data);
    let resultado:any = JSON.stringify(respuesta);
    console.log('coer'+resultado);
    let json=JSON.parse(resultado).result;
    this.asistencias = json;
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    let datos = this.barcodes[this.barcodes.length - 1].rawValue;
    let lista = datos.split('|');
    let seccion = lista[0];
    let asignatura = lista[1]; 
    let fecha = lista[3];
    console.log('coer'+datos);
    let data = this.apiService.asistenciaAlmacenar(this.usuario, asignatura, seccion, fecha);
    let respuesta = await lastValueFrom(data);
    let estado = JSON.stringify(respuesta);
    console.log('coer'+estado);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

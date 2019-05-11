import { Component, OnInit } from '@angular/core';
import { NavController, Loading, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Eventos } from '../../models/eventos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ServicesProvider]
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    this.services.loading(async (load: Loading) => {
      load.setContent("Buscando eventos.");

      try {
        await this.services.webservice("eventos")
          .then((res : Eventos[]) => {
            this.eventos = res;
          }).catch(err => { throw err });
      } catch (err) {
        this.toastCtrl.create({
          closeButtonText: "fechar",
          message: err.message ? err.message : err,
          showCloseButton: true
        }).present();
      }

      load.dismiss();
    })
  }

  private eventos: Eventos[] = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private services: ServicesProvider) {

  }

}

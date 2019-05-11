import { Component, OnInit } from '@angular/core';
import { NavController, Loading, ToastController, ModalController, Refresher } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Eventos } from '../../models/eventos';
import { MdlInformacoesEventosPage } from '../../modals/mdl-informacoes-eventos/mdl-informacoes-eventos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ServicesProvider]
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    this.services.loading(async (load: Loading) => {
      load.setContent("Buscando eventos...");
      try {
        await this.services.webservice("eventos/ordenado")
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

  eventos: Eventos[] = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private services: ServicesProvider) {

  }

  doRefresh(refresher: Refresher) {
    setTimeout(async () => {
        try {
          await this.services.webservice("eventos/ordenado")
            .then((res : Eventos[]) => {
              this.eventos = res;
            }).catch(err => { throw err });

            this.toastCtrl.create({
              message: "Eventos atualizados com sucesso!",
              duration: 1500            
            }).present();
        } catch (err) {
          this.toastCtrl.create({
            closeButtonText: "fechar",
            message: err.message ? err.message : err,
            showCloseButton: true
          }).present();
      }
      refresher.complete();
    }, 2000);
  }

  participar(evento: Eventos){
    //Implementar
  }

  informacoes(evento: Eventos){
    this.modalCtrl.create(MdlInformacoesEventosPage, { evento: evento }).present();
  }
}

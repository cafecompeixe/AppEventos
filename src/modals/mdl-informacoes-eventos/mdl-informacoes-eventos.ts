import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Eventos } from '../../models/eventos';
import { Endereco } from '../../models/endereco';
import { Atividade } from '../../models/atividade';

/**
 * Generated class for the MdlInformacoesEventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mdl-informacoes-eventos',
  templateUrl: 'mdl-informacoes-eventos.html',
  providers: [ServicesProvider]
})
export class MdlInformacoesEventosPage implements OnInit {
  
  ngOnInit(): void {
    this.services.loading(async load => {
      try {
        load.setContent("Verificando o endereço do evento...");

        await this.services.webservice(`enderecos/${this.evento.endereco}`)
          .then((res : Endereco) => {
            this.evento.cEndereco = res;
          })
          .catch(err => { throw err });

        for(let atividade of this.evento.atividade){
          load.setContent(`Carregando ${ this.evento.atividade.indexOf(atividade) + 1 } de ${ this.evento.atividade.length } atividades...`);

          await this.services.webservice(`atividades/${atividade}`)
            .then((res : Atividade) => {
              this.evento.atividades.push(res);
            })
            .catch(err => { throw err });
        }
        
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

  //#region Propriedades

  evento: EventoCompleto;

  //#endregion

  constructor(public navCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private services: ServicesProvider) {
    this.evento = new EventoCompleto(navParams.get("evento"));
  }

  fechar(){
    this.navCtrl.dismiss();
  }
}

class EventoCompleto implements Eventos{
  id: number;  nome: string;
  descricao: string;
  data: Date;
  endereco: number;
  atividade: number[];

  cEndereco: Endereco;
  atividades: Atividade[] = [];

  constructor(evento: Eventos) {
    for(let propName in evento)
      if(evento[propName])
        this[propName] = evento[propName];
  }
}

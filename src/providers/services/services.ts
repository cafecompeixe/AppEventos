//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import 'rxjs/Observable';
import { Aluno } from '../../models/aluno';

@Injectable()
export class ServicesProvider {

  //#region Propriedades

  url: string = 'http://172.16.9.199:8000';
  load: Loading;

  //#endregion

  constructor(public http: Http, public loadCtrl: LoadingController) {  }

  //#region Loading Controller

  loading(operacao: (Loading: Loading) => void){
    this.load = this.loadCtrl.create({
      content: "Aguarde...",
      spinner: "bubbles"
    });

    this.load.present().then(() => { operacao(this.load); });
  }

  //#endregion

  //#region WebService

  webservice(modulo: string) : Promise<any>;
  webservice(modulo: string, tipoRequisicao?: TipoRequisicao): Promise<any>;
  webservice(modulo: string, tipoRequisicao?: TipoRequisicao, dados?: FormData): Promise<any>{
    if(!tipoRequisicao)
      tipoRequisicao = TipoRequisicao.GET;

    let retorno: Promise<any>;
    console.log(`${this.url}/${modulo}`);

    switch(tipoRequisicao){
      case TipoRequisicao.GET:
        retorno = this.http.get(`${this.url}/${modulo}`).toPromise()
          .then(res => res.json())
          .catch((err) => Promise.reject(/*"Houve algum problema de conexão tente novamente mais tarde"*/err));
        break;
      case TipoRequisicao.POST:
        retorno = this.http.post(`${this.url}/${modulo}`, dados).toPromise()
          .then(res => res.json())
          .catch((err) => Promise.reject(/*"Houve algum problema de conexão tente novamente mais tarde"*/err));
        break;
      case TipoRequisicao.PUT:
        retorno = this.http.put(`${this.url}/${modulo}`, dados).toPromise()
          .then(res => res.json())
          .catch((err) => Promise.reject(/*"Houve algum problema de conexão tente novamente mais tarde"*/err));
        break;
      case TipoRequisicao.DELETE:
        retorno =this.http.delete(`${this.url}/${modulo}`).toPromise()
          .then(res => res.json())
          .catch((err) => Promise.reject(/*"Houve algum problema de conexão tente novamente mais tarde"*/err));
        break;
    }

    return retorno;
  }

  //#endregion

  //#region Sessão

  obterSessao(): Aluno{
    let aluno: Usuario = new Usuario();
    for(let propName in aluno)
      if(localStorage.getItem(propName))
        aluno[propName] = localStorage.getItem(propName) as any;

    return aluno;
  }

  salvarSessao(aluno: Aluno){
    for(let propName in aluno)
      if(aluno[propName])
        localStorage.setItem(propName, aluno[propName]);
  }

  removerSessao(){
    let aluno: Usuario = new Usuario();
    for(let propName in aluno)
      localStorage.removeItem(propName);
  }

  //#endregion
}

//#region Classes e Enumerações externas

class Usuario implements Aluno{
  id: number;
  matricula: number;
  nome: string;
}

export enum TipoRequisicao{
  GET,
  POST,
  PUT,
  DELETE
}

//#endregion

import { Injectable } from '@angular/core';
import { OpeGuia } from '../model/OpeGuia';
import { OpeServicio } from '../model/OpeServicio';
import { Pasajero } from '../model/Pasajero';
import { SegUsuario } from '../model/SegUsuario';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ServicioGeneral {


    private ruta: string = "";
    constructor(private http: Http) {

    }

    Sp_WebEncuesta_RescataGuias_Recogida(fecha, id): Promise<OpeGuia[]> {
         
        let idSegUsuario: number = id;

        //this.ruta = 'http://localhost:38831/api/OpeGuias?fecha=' + fecha + '&idSegUsuario=' + idSegUsuario;
        this.ruta = 'https://ws-situr.asinco.cl/api/OpeGuias/obtenerGuia?fecha=' + fecha + '&idSegUsuario=' + idSegUsuario;
   
        return this.http.get(this.ruta)
            .toPromise()
            .then(
            (response) => {
                let respuesta: any = response;
                let guia: OpeGuia[] = JSON.parse(respuesta._body);
                return guia;
            }
            ).catch()
    }

    Sp_WebEncuesta_RescataServicios_Recogida(idOpeGuia, fecha, id): Promise<OpeServicio[]> {

        let idSegUsuario: number = id;

        //this.ruta = 'http://localhost:38831/api/OpeServicios?idOpeGuia=' + idOpeGuia + '&fecha=' + fecha + '&idSegUsuario=' + idSegUsuario;
        this.ruta = 'https://ws-situr.asinco.cl/api/OpeServicios/obtenerServicio?idOpeGuia=' + idOpeGuia + '&fecha=' + fecha + '&idSegUsuario=' + idSegUsuario;
        return this.http.get(this.ruta)
            .toPromise()
            .then(
            (response) => {
                let respuesta: any = response;
                let servicio: OpeServicio[] = JSON.parse(respuesta._body);
                return servicio;
            }
            ).catch()
    }

    Sp_WebEncuesta_RescataPasajeros_Recogida(idOpeServicio, id): Promise<Pasajero[]> {
        let idSegUsuario: number = id;

        //this.ruta = 'http://localhost:38831/api/OpeServicioDetalles?idOpeServicio=' + idOpeServicio + '&idSegUsuario=' + idSegUsuario;
        this.ruta = 'https://ws-situr.asinco.cl/api/OpeServicioDetalles/obtenerPasajero?idOpeServicio=' + idOpeServicio + '&idSegUsuario=' + idSegUsuario;

        return this.http.get(this.ruta)
            .toPromise()
            .then(
            (response) => {
                let respuesta: any = response;
                let pasajero: Pasajero[] = JSON.parse(respuesta._body);
                return pasajero;
            }
            ).catch()
    }

    Sp_WebEncuesta_GrabaStatus_Recogida(_idOpeServicioDetalle, _esRecogida, _fechaHoraRecogida, _recogidaObs, id) {
        let idSegUsuario: number = id;

        //this.ruta = 'http://localhost:38831/api/OpeServicioDetalles/grabarEstatus?idOpeServicioDetalle=' + _idOpeServicioDetalle + '&esRecogida=' + _esRecogida + '&fechaHoraRecogida=' + _fechaHoraRecogida + '&recogidaObs=' + _recogidaObs + '&id=' + idSegUsuario;
        this.ruta = 'https://ws-situr.asinco.cl/api/OpeServicioDetalles/grabarEstatus?idOpeServicioDetalle=' + _idOpeServicioDetalle + '&esRecogida=' + _esRecogida + '&fechaHoraRecogida=' + _fechaHoraRecogida + '&recogidaObs=' + _recogidaObs + '&id=' + idSegUsuario;
       
        let model = {
            idOpeServicioDetalle: _idOpeServicioDetalle,
            esRecogida: _esRecogida,
            fechaHoraRecogida: _fechaHoraRecogida,
            recogidaObs: _recogidaObs
        };
        return this.http.post(this.ruta, model)
            .subscribe(res => res.json());
    }

    Sp_WebEncuesta_Logeo(user, pass): Promise<SegUsuario[]> {

        //this.ruta = 'http://localhost:38831/api/SegUsuarios/obtenerUsuario?user=' + user + '&pass=' + pass;
        this.ruta = 'https://ws-situr.asinco.cl/api/SegUsuarios/obtenerUsuario?user=' + user + '&pass=' + pass;


        return this.http.get(this.ruta)
            .toPromise()
            .then(
            (response) => {
                let respuesta: any = response;
                let usuario: SegUsuario[] = JSON.parse(respuesta._body);
                return usuario;
            }
            ).catch()
    }
}

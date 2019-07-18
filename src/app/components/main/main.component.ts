import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ServicioGeneral } from '../../service/ServicioGeneral';
import { OpeGuia } from '../../model/OpeGuia';
import { OpeServicio } from '../../model/OpeServicio';
import { Pasajero } from '../../model/Pasajero';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    

    public fecha: string;
    public idOpeGuia: number;
    public idOpeServicio: number;
    public esRecogida: boolean;
    public recogidaObs: string;

    public datos: any;




    constructor(private servicioGeneralService: ServicioGeneral,
        private route: ActivatedRoute,
        private router: Router) {

        if (sessionStorage.getItem("sessionAsinco") === null) {

            this.router.navigate(['/main']);

        } else {
            const session = sessionStorage.getItem('sessionAsinco');

            if (session == "1") {

                //alert("Usuario con id " + session);
            } else {
                this.router.navigate(['/main']);
            }
        }

        
    }

    ngOnInit(): void {

        let datos = {
            fecha: "",
            idOpeServicio: 0,
            idOpeGuia: 0,
            estadoHijo: '0'

        };

        
        if (localStorage.getItem("datos") === null)
        {
            console.log("No existen datos en el repositorio");
        } else {
            datos = JSON.parse(localStorage.getItem("datos"));
            console.log("prueba if ");
            if (datos.estadoHijo == "1") {

                setTimeout(() => {
                    this.fecha = datos.fecha;
                    this.idOpeGuia = datos.idOpeGuia;
                    this.idOpeServicio = datos.idOpeServicio;
                    console.log(datos);
                    let session = sessionStorage.getItem("sessionAsinco");
                    this.getGuia(this.fecha);
                    this.getServicio(this.idOpeGuia);
                    this.getPasajero(this.idOpeServicio);

                }, 10);
            } else {  }
        }

        
    }

    public guias: OpeGuia[];

    primera(): void {
        console.log("Dentro de primera");
        console.log(this.fecha);
    }

    getGuia(even): void {
        this.fecha = even;
        const session = sessionStorage.getItem('sessionAsinco');
        this.servicioGeneralService.Sp_WebEncuesta_RescataGuias_Recogida(this.fecha, session)
            .then(
            (d) => {
                this.guias = d;
                console.log(this.guias);

                let cbGuia = <HTMLElement>document.querySelector("#cbGuia");
                cbGuia.innerHTML = "";
                
                let idSelect = "#cbGuia";
                this.llenarSelect(idSelect);

                for (let i = 0; i < this.guias.length; i++) {

                    let datos = {
                        fecha: "",
                        idOpeServicio: 0,
                        idOpeGuia: 0,
                        estadoHijo: '0'

                    };

                    
                    if (localStorage.getItem("datos") === null) {
                        let id: string = this.guias[i].idOpeGuia.toString();
                        let elemento = document.createElement('option');
                        elemento.setAttribute("value", id);

                        let texto = document.createTextNode(this.guias[i].nombre);
                        elemento.appendChild(texto);

                        document.getElementById("cbGuia").appendChild(elemento);
                    } else {
                        datos = JSON.parse(localStorage.getItem("datos"));
                        console.log("prueba if ");
                        if (datos.idOpeGuia == this.guias[i].idOpeGuia)
                        {
                            let id: string = this.guias[i].idOpeGuia.toString();
                            let elemento = document.createElement('option');
                            elemento.setAttribute("value", id);
                            elemento.setAttribute("selected", "true");

                            let texto = document.createTextNode(this.guias[i].nombre);
                            elemento.appendChild(texto);

                            document.getElementById("cbGuia").appendChild(elemento);
                        } else {
                            let id: string = this.guias[i].idOpeGuia.toString();
                            let elemento = document.createElement('option');
                            elemento.setAttribute("value", id);

                            let texto = document.createTextNode(this.guias[i].nombre);
                            elemento.appendChild(texto);

                            document.getElementById("cbGuia").appendChild(elemento);
                        }

                    }


                    
                }
                var e = (document.getElementById("cbGuia")) as HTMLSelectElement;
                var sel = e.selectedIndex;
                var opt = e.options[sel];
                if (opt.value === "Elija una opcion") {
                    this.servicios = [];

                }
                

            }
            );
    }
    public servicios: OpeServicio[];

    getServicio(even): void {
        this.idOpeGuia = even;
        let id: string = sessionStorage.getItem('sessionAsinco');
        this.servicioGeneralService.Sp_WebEncuesta_RescataServicios_Recogida(this.idOpeGuia, this.fecha, id)

            .then(
            (d) => {
                this.servicios = d;
                console.log(this.servicios);

                let cbServicio = <HTMLElement>document.querySelector("#cbServicio");
                cbServicio.innerHTML = "";

                let idSelect = "#cbServicio";
                this.llenarSelect(idSelect);

                for (let i = 0; i < this.servicios.length; i++) {

                    let datos = {
                        fecha: "",
                        idOpeServicio: 0,
                        idOpeGuia: 0,
                        estadoHijo: '0'
                    };

                    if (localStorage.getItem("datos") === null) {

                        let id: string = this.servicios[i].idOpeServicio.toString();
                        let elemento = document.createElement('option');
                        elemento.setAttribute("value", id);

                        let texto = document.createTextNode(this.servicios[i].descripcion);
                        elemento.appendChild(texto);

                        document.getElementById("cbServicio").appendChild(elemento);
                    } else {
                        datos = JSON.parse(localStorage.getItem("datos"));
                        console.log("prueba if ");
                        if (datos.idOpeServicio == this.servicios[i].idOpeServicio) {
                            let id: string = this.servicios[i].idOpeServicio.toString();
                            let elemento = document.createElement('option');
                            elemento.setAttribute("value", id);
                            elemento.setAttribute("selected", "true");

                            let texto = document.createTextNode(this.servicios[i].descripcion);
                            elemento.appendChild(texto);

                            document.getElementById("cbServicio").appendChild(elemento);
                        } else {
                            let id: string = this.servicios[i].idOpeServicio.toString();
                            let elemento = document.createElement('option');
                            elemento.setAttribute("value", id);

                            let texto = document.createTextNode(this.servicios[i].descripcion);
                            elemento.appendChild(texto);

                            document.getElementById("cbServicio").appendChild(elemento);
                        }

                    }

                }
                var e = (document.getElementById("cbServicio")) as HTMLSelectElement;
                var sel = e.selectedIndex;
                var opt = e.options[sel];
                if (opt.value === "Elija una opcion") {
                    this.pasajeros = [];
                }
                
            }
            );
    }
    public pasajeros: Pasajero[];

    getPasajero(even): void {
        this.idOpeServicio = even;
        let id: string = sessionStorage.getItem('sessionAsinco');
        this.servicioGeneralService.Sp_WebEncuesta_RescataPasajeros_Recogida(this.idOpeServicio, id)
            .then(
            (d) => {
                this.pasajeros = d;
                let esRecogida: string="Si";
                console.log(this.pasajeros);
                this.recogidaObs = this.pasajeros['recogidaObs'];


            }
        );
        //localStorage.clear();
    }

    guardarDatos(_esRecogida, _recogidaObs): void {

        this.datos = {
            fecha: this.fecha,
            idOpeServicio: this.idOpeServicio,
            idOpeGuia: this.idOpeGuia,
            estadoHijo: '1',
            esRecogida: _esRecogida,
            recogidaobs: _recogidaObs
            
        };
        localStorage.setItem("datos", JSON.stringify(this.datos));  
    }

    llenarSelect(id): void {

        let cbGuia = <HTMLElement>document.querySelector(id);
        cbGuia.innerHTML = "<option style='cursor:no-drop'>Elija una opcion  </option>";
    }
}

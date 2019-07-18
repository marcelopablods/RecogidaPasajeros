import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ServicioGeneral } from '../../service/ServicioGeneral';
import { Pasajero } from '../../model/Pasajero';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-servicioDetalle',
    templateUrl: './servicioDetalle.html',
    styleUrls: [ './servicioDetalle.css']
})
export class ServicioDetalleComponent {

    public idOpeServicioDetalle: number;
    public chkRecoger: boolean;
    public txtFechaHoraRecogida: string;
    public txtObservacion: string;
    public datos: any;

    private sub: any;

    constructor(private servicioGeneralService: ServicioGeneral,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.idOpeServicioDetalle = +params['id']; // (+) converts string 'id' to a number
            console.log(this.idOpeServicioDetalle);
            // In a real app: dispatch action to load the details here.
        });
        this.obtenerFecha();

        this.datos = JSON.parse(localStorage.getItem("datos"));
        console.log(this.datos);
        this.chkRecoger = this.datos.esRecogida;
        this.txtObservacion = this.datos.recogidaobs;
        
    }

    //formatearFecha(): void {
        
    //    var datos = this.txtFechaHoraRecogida.split("T");
    //    var fechas = datos[0].split("-");
    //    this.txtFechaHoraRecogida = fechas[0]+"-"+fechas[2]+"-"+fechas[1]+" "+datos[1];

    //}


    grabarRecogida(): void {
        let id = 0;
        //this.formatearFecha();
        let respuesta = this.servicioGeneralService.Sp_WebEncuesta_GrabaStatus_Recogida(this.idOpeServicioDetalle, this.chkRecoger, this.txtFechaHoraRecogida, this.txtObservacion, id);
        this.router.navigate(['/main']);

    }

    obtenerFecha(): void {

        this.txtFechaHoraRecogida = new Date().toLocaleString();

    }



}

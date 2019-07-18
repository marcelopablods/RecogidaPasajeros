import { Component } from '@angular/core';
import { ServicioGeneral } from '../../service/ServicioGeneral';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SegUsuario } from "../../model/SegUsuario";

@Component({
    selector: 'app-root',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})

export class LoginComponent {
    usuarios: SegUsuario[];
    public txtUser: string;
    public txtPassword: string;

    mensaje: boolean = false;

    ngOnInit(): void {
        if(sessionStorage.getItem('sessionAsinco')=='1'){
            this.router.navigate(['/main']);
        }
    }
    
    constructor(private servicioGeneralService: ServicioGeneral,
        private route: ActivatedRoute,
        private router: Router) {
    }
    loguear(user, pass): void {

        this.txtUser = user;
        this.txtPassword = pass;
        this.servicioGeneralService.Sp_WebEncuesta_Logeo(this.txtUser, this.txtPassword)
            .then(
            (d) => {

                function cerrarSession():void{
                    setTimeout(function(){ 
                        sessionStorage.clear();
                        window.location.href = "https://app-services-01.asinco.cl:5000/";
                        console.log("adentro cerrar Session"); 
                    },28800000);
                    //28800000
                    
                   
                }    

                this.usuarios = d;
                console.log(this.usuarios);
                console.log(this.usuarios[0].estado);
                if (this.usuarios[0].estado == true) {  
                      
                    sessionStorage.setItem("sessionAsinco", this.usuarios[0].idSegUsuario.toString());
                    cerrarSession();
                    this.router.navigate(['/main']);



                } else {
                    this.mensaje=true;

                }
            }

        );
        
    }
}

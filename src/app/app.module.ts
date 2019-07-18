import { BrowserModule } from '@angular/platform-browser';
//ENRRUTAMIENTO
//import { routing } from '../service/rutas';
//  METODOS HTTP
import { HttpModule } from '@angular/http';
//
import { NgModule } from '@angular/core';
//PARA USAR NG-MODEL
import { FormsModule } from '@angular/forms';

import { provideRoutes, RouterModule, Routes } from '@angular/router';


//COMPONENTES
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ServicioDetalleComponent } from './components/servicioDetalle/servicioDetalleComponent';
import { LoginComponent } from './components/login/login';

//SERVICES
import { ServicioGeneral } from './service/ServicioGeneral';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'servicioDetalle/:id',
        component: ServicioDetalleComponent
    },
    { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
      AppComponent,
      MainComponent,
      ServicioDetalleComponent,
      LoginComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
  ],
  providers: [ServicioGeneral],
  bootstrap: [AppComponent]
})
export class AppModule { }

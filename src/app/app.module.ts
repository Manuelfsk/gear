import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SoloNumeros_y_decimales } from './val.numeros_y_decimales';
import { TornilloPotenciaComponent } from './componente/tornillo-potencia/tornillo-potencia.component';
import { EjeParaleloComponent } from './componente/eje-paralelo/eje-paralelo.component';
import { EjePerpendicularComponent } from './componente/eje-perpendicular/eje-perpendicular.component';
import { NotFoundComponent } from './componente/not-found/not-found.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SoloNumeros_y_decimales,
    TornilloPotenciaComponent,
    EjeParaleloComponent,
    EjePerpendicularComponent,
    NotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

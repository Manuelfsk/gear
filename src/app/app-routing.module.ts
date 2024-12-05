import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TornilloPotenciaComponent } from './componente/tornillo-potencia/tornillo-potencia.component';
import { EjeParaleloComponent } from './componente/eje-paralelo/eje-paralelo.component';
import { EjePerpendicularComponent } from './componente/eje-perpendicular/eje-perpendicular.component';
import { NotFoundComponent } from './componente/not-found/not-found.component';

const routes: Routes = [
  {path:"tornillo-potencia",component:TornilloPotenciaComponent},
  {path:"eje-paralelo",component:EjeParaleloComponent},
  {path:"eje-perpendicular", component:EjePerpendicularComponent},
  {path:'', redirectTo:'/tornillo-potencia', pathMatch:'full'},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-eje-perpendicular',
  templateUrl: './eje-perpendicular.component.html',
  styleUrls: ['./eje-perpendicular.component.css']
})

export class EjePerpendicularComponent {
  // engrane Cónico
  Modulo_cono: number | null = null; Dientes_cono: number | null = null;
  angulo_pre: number | null = null; k_cono: number | null = null;
  p_cono: number | null = null; Dp_cono: number | null = null;
  De_cono: number | null = null; ang_primitivo: number | null = null;
  ang_cabeza: number | null = null; ang_talla: number | null = null;
  ang_pie: number | null = null; Ng: number | null = null;
  // engrane Piñon Cónico
  Dientes_pnn: number | null = null; ang_talla_pnn: number | null = null;
  p_pnn: number | null = null; ang_pie_pnn: number | null = null;
  Dpvo_pnn: number | null = null; De_pnn: number | null = null;
  ang_primitivo_pnn: number | null = null; ang_cabeza_pnn: number | null = null;
  Rt_engrane: string = ""; vel_engrane: number | null = null;
  rpm: number | null = null; Np: number | null = null;


  CalcularMcD(a: number, b: number) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  Engrane_conico() {

    if (this.Modulo_cono === null)
      return
    if (this.Dientes_cono === null)
      return
    if (this.Dientes_pnn === null)
      return
    if (this.rpm === null)
      return
    if (this.k_cono === null)
      return
    if (this.angulo_pre === null)
      return

    // Paso
    const paso = this.Modulo_cono * Math.PI;
    this.p_cono = parseFloat((paso).toFixed(2));
    // Dp
    const Dp = this.Modulo_cono * this.Dientes_cono;
    this.Dp_cono = Dp;
    // águlo primitivo 
    const conver_a_radianes = Math.PI / 180;
    const conver_a_grados = (180 / Math.PI);
    const Diferencia_primitivo = Math.atan(this.Dientes_cono / this.Dientes_pnn);
    const Gradosprimitivo = parseFloat((Diferencia_primitivo * conver_a_grados).toFixed(2));
    this.ang_primitivo = Gradosprimitivo;
    // De  
    const Angulo_pritvo = Gradosprimitivo * conver_a_radianes;
    const cos_A = Math.cos(Angulo_pritvo);
    const dos_M = ((2 * this.Modulo_cono) * cos_A) + this.Dp_cono;
    this.De_cono = parseFloat((dos_M).toFixed(2));
    //  Ángulo pie
    const raiz = Math.sqrt((this.Dientes_cono ** 2) + (this.Dientes_pnn ** 2))
    const angulo_pie = 90 / raiz;
    this.ang_pie = parseFloat((angulo_pie).toFixed(2));
    // Ángulo cabeza deinte 
    const radianes_alfa = Gradosprimitivo * conver_a_radianes;
    const seno_Alf = Math.sin(radianes_alfa);
    const angulo_cabeza = (2 * seno_Alf) / this.Dientes_cono;
    const atan_cab_diente = Math.atan(angulo_cabeza);
    const grado_cabeza_diente = parseFloat((atan_cab_diente * conver_a_grados).toFixed(2))
    this.ang_cabeza = grado_cabeza_diente;
    // Ángulo talla At
    this.ang_talla = parseFloat((this.ang_primitivo - this.ang_pie).toFixed(2));
    // /////////////////////////
    // Engrane  piñon cónico
    // Paso
    const paso_pnn = this.Modulo_cono * Math.PI;
    this.p_pnn = parseFloat((paso_pnn).toFixed(2));
    // Dp
    const Dp_pnn = this.Modulo_cono * this.Dientes_pnn;
    this.Dpvo_pnn = Dp_pnn;
    // águlo primitivo
    this.ang_primitivo_pnn = Gradosprimitivo;
    // De  
    const dos_M_pnn = ((2 * this.Modulo_cono) * cos_A) + this.Dpvo_pnn;
    this.De_pnn = parseFloat((dos_M_pnn).toFixed(2));
    //  Ángulo pie
    this.ang_pie_pnn = parseFloat((angulo_pie).toFixed(2));
    // Ángulo cabeza deinte 
    const angulo_cabeza_pnn = (2 * seno_Alf) / this.Dientes_pnn;
    const atan_cab_diente_pnn = Math.atan(angulo_cabeza_pnn);
    const grado_cabeza_diente_pnn = parseFloat((atan_cab_diente_pnn * conver_a_grados).toFixed(2))
    this.ang_cabeza_pnn = grado_cabeza_diente_pnn;
    // Ángulo talla At
    this.ang_talla_pnn = parseFloat((this.ang_primitivo_pnn - this.ang_pie_pnn).toFixed(2));

    // relacion de transmisión Rt = Zp /Ze
    if (this.Dientes_pnn > 0 && this.Dientes_cono > 0) {
      const mcd = this.CalcularMcD(this.Dientes_pnn, this.Dientes_cono);
      const rel_pinon = this.Dientes_pnn / mcd;
      const rel_engranaje = this.Dientes_cono / mcd;
      this.Rt_engrane = `${rel_pinon}:${rel_engranaje}`;
    }
    // vel engrane
    this.vel_engrane = parseFloat(((this.Dientes_pnn / this.Dientes_cono) * this.rpm).toFixed(2));
    // Np
    const dosK = 2 * this.k_cono;
    const rad_theta = this.angulo_pre * conver_a_radianes;
    const tres_seno_theta_Dos = 3 * (Math.sin(rad_theta)**2);
    const raiz_Np = 1+(Math.sqrt(1 + tres_seno_theta_Dos));
    const res_Np = parseFloat(((dosK/tres_seno_theta_Dos)*raiz_Np).toFixed(2)); 
    this.Np = Math.ceil(res_Np);
    // Ng
    const Np_dos= this.Np**2;
    const sen_dos = Math.sin(rad_theta)**2;
    const IVK_dos = 4*(this.k_cono**2 );
    const IV_k = 4*this.k_cono;
    const II_Np = 2 *this.Np;
    const Res_Ng = parseFloat((((Np_dos *sen_dos)-(IVK_dos)) / ((IV_k) - (II_Np * sen_dos))).toFixed(2))
    this.Ng = Res_Ng






  }

}

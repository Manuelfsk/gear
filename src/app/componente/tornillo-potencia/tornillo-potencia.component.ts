import { Component } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tornillo-potencia',
  templateUrl: './tornillo-potencia.component.html',
  styleUrls: ['./tornillo-potencia.component.css']
})
export class TornilloPotenciaComponent {
  diam_Mayor: number | null = null
  paso_tornillo: number | null = null
  espesor: number | null = null
  altura: number | null = null
  num_entradas: number | null = null
  dr_interno: number | null = null
  dm_medio: number | null = null
  helice: number | null = null
  avance: number | null = null
  eficiencia: number | null = null
  f_compresion: number | null = null
  Coef_friccion: number | null = null
  Fc: number | null = null
  Dc_collarin: number | null = null
  Tc: number | null = null
  Tr: number | null = null
  Tl: number | null = null
  Tr_tc: number | null = null
  Tl_tc: number | null = null
  Esf_cort: number | null = null
  Esf_axial: number | null = null
  Esf_apoyo38: number | null = null
  Esf_apoyo25: number | null = null
  Esf_apoyo18: number | null = null
  Flexion38: number | null = null
  Flexion25: number | null = null
  Flexion18: number | null = null
  vano_tuerca: number | null = null
  tolerancia_vano: number | null = null
  tornear_D: number | null = null

  Calcular_tornillo() {
    if (this.diam_Mayor === null) {
      console.error('error diametro mayor');
      return;
    }
    if (this.num_entradas === null)
      return;
    if (this.f_compresion === null)
      return;
    if (this.Coef_friccion === null)
      return;
    if (this.Fc === null)
      return;
    if (this.Dc_collarin === null)
      return;
    if (this.f_compresion === null)
      return;
    if(this.tolerancia_vano === null)
      return

    const mayor_Dm = this.diam_Mayor !== null ? Number(this.diam_Mayor) : 0;
    
    const paso = 0.2;
    this.paso_tornillo = mayor_Dm * paso;
    console.log('-->paso es ' + this.paso_tornillo);

    const cte_esp_alt = 0.5;
    this.espesor = cte_esp_alt * this.paso_tornillo;
    this.altura = cte_esp_alt * this.paso_tornillo;

    const filete = 2 * this.altura;
    this.dr_interno = mayor_Dm - filete;
    this.dm_medio = (mayor_Dm + this.dr_interno) / 2;
    console.log('--> dm medio', mayor_Dm, this.dr_interno, this.dm_medio, '--> formula', (mayor_Dm + this.dr_interno) / 2);

    const P_n = this.paso_tornillo * this.num_entradas;
    const Pi_dm = Math.PI * this.dm_medio;
    this.helice = parseFloat((Math.atan((P_n) / Pi_dm) * (180 / Math.PI)).toFixed(2));

    this.avance = P_n;

    const F_dm = (this.f_compresion * this.dm_medio) / 2;
    const L_pi_F_dm = this.avance + (Math.PI * this.Coef_friccion * this.dm_medio);
    const pi_dm_F_L = (Math.PI * this.dm_medio) - (this.Coef_friccion * this.avance);
    this.Tr = parseFloat((F_dm * (L_pi_F_dm / pi_dm_F_L)).toFixed(2))
    console.log('--> tr', F_dm, L_pi_F_dm, pi_dm_F_L);


    const L_mas_piFdm = ((Math.PI * this.Coef_friccion * this.dm_medio) - this.avance);
    const piDm_menos_FL = ((Math.PI * this.dm_medio) + (this.Coef_friccion * this.avance));
    this.Tl = parseFloat((F_dm * (L_mas_piFdm / piDm_menos_FL)).toFixed(2));

    const F_fcDc = parseFloat(((this.f_compresion * this.Fc * this.Dc_collarin) / 2).toFixed(3))
    this.Tc = F_fcDc

    this.Tr_tc = parseFloat((this.Tr + this.Tc).toFixed(2)) // Tr global
    this.Tl_tc = parseFloat((this.Tl + this.Tc).toFixed(2))

    const F_L = this.f_compresion * this.avance;
    const Dos_pi_Tr = 2 * Math.PI * this.Tr_tc;
    this.eficiencia = parseFloat((F_L / Dos_pi_Tr).toFixed(3));

    const Dseis_Tr = 16 * (this.Tr_tc * 1000);
    const pi_dr = Math.PI * Math.pow(this.dr_interno, (3));
    this.Esf_cort = parseFloat((Dseis_Tr / pi_dr).toFixed(2));

    const cat_F = 4 * (this.f_compresion * 1000);
    const pi_dr2 = Math.PI * Math.pow(this.dr_interno, 2);
    this.Esf_axial = - parseFloat((cat_F / pi_dr2).toFixed(2));

    const trei_f = 2 * (0.38 * (this.f_compresion * 1000));
    const pi_dm_unoP = Math.PI * this.dm_medio * 1 * this.paso_tornillo;
    this.Esf_apoyo38 = -parseFloat((trei_f / pi_dm_unoP).toFixed(2));

    const vent_f = 2 * (0.25 * (this.f_compresion * 1000));
    const pi_dm_dosP = Math.PI * this.dm_medio * 2 * this.paso_tornillo;
    this.Esf_apoyo25 = -parseFloat((vent_f / pi_dm_dosP).toFixed(2));

    const diocho_f = 2 * (0.18 * (this.f_compresion * 1000));
    const pi_dm_tresP = Math.PI * this.dm_medio * 3 * this.paso_tornillo;
    this.Esf_apoyo18 = -parseFloat((diocho_f / pi_dm_tresP).toFixed(2));

    this.Flexion38 = parseFloat((6 * (0.38 * (this.f_compresion * 1000))/(Math.PI*this.dr_interno*1*this.paso_tornillo)).toFixed(2));
    this.Flexion25 = parseFloat((6 * (0.25 * (this.f_compresion * 1000))/(Math.PI*this.dr_interno*2*this.paso_tornillo)).toFixed(2));
    this.Flexion18 = parseFloat((6 * (0.18 * (this.f_compresion * 1000))/(Math.PI*this.dr_interno*3*this.paso_tornillo)).toFixed(2));

    const paso_tor = this.paso_tornillo !== null ? Number(this.paso_tornillo) : 0;
    const dr_inter = this.dr_interno !== null ? Number(this.dr_interno) : 0;
    const torno = 0.125
    this.tornear_D = parseFloat((dr_inter + (torno * paso_tor)).toFixed(3));
    this.vano_tuerca = parseFloat((this.espesor + this.tolerancia_vano).toFixed(3));
    console.log(dr_inter + ' dr '  + torno + ' torno ' + paso_tor + ' paso ' + paso_tor);
    console.log(this.espesor+ ' espesor ' + this.tolerancia_vano + ' tolerancia ');
    
    
  }
}

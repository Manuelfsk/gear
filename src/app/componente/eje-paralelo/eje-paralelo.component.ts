import { Component } from '@angular/core';

@Component({
  selector: 'app-eje-paralelo',
  templateUrl: './eje-paralelo.component.html',
  styleUrls: ['./eje-paralelo.component.css']
})
export class EjeParaleloComponent {

  // engrane dientes rectos y piñon
  Modulo_recT: number | null = null; dientes_rect: number | null = null;
  dientes_pnn: number | null = null; De: number | null = null;
  De_pn: number | null = null; Dp: number | null = null;
  Dp_pn: number | null = null; Di: number | null = null;
  Di_pn: number | null = null; h: number | null = null;
  h_pn: number | null = null; l: number | null = null;
  l_pn: number | null = null; i: number | null = null;
  i_pn: number | null = null; r: number | null = null;
  r_pn: number | null = null; p: number | null = null;
  p_pn: number | null = null; e: number | null = null;
  e_pn: number | null = null; c: number | null = null;
  c_pn: number | null = null; ang_pre: number = 20
  Np: number | null = null; k = 1; Np_m: number | null = null; Ng: number | null = null;
  x: number | null = null; Rt: String = "";
  vel: number | null = null; rpm: number | null = null;
  // engrane helicoidales
  Mr_helic: number | null = null; Ma_helic: number | null = null;
  Ze: number | null = null; Ang_helice: number | null = null;
  ang_pre_heli: number | null = null; Dp_hel: number | null = null;
  De_hel: number | null = null; p_helic: number | null = null;
  Pa_helic: number | null = null; Pr_helic: number | null = null;
  Ec_heilc: number | null = null; H_heli: number | null = null;
  Ma_helic_p: number | null = null; rpm_heli: number | null = null
  Zp: number | null = null; Dp_hel_p: number | null = null;
  De_hel_p: number | null = null; p_helic_p: number | null = null;
  Pa_helic_p: number | null = null; Pr_helic_p: number | null = null;
  Ec_heilc_p: number | null = null; H_heli_p: number | null = null;
  Rt_heli: String = ""; NP_hel_p: number | null = null;
  Ng_hel_p: number | null = null; vel_pnn: number | null = null;
  k_pnn: number = 1; pre_transversal: number | null = null;
  // engrane cadena
  Dientes_cdn: number | null = null; Paso_cadena: number | null = null;
  Diam_rodillos: number | null = null; Der: number | null = null;
  De_rod: number | null = null; Dp_rod: number | null = null;
  Di_rod: number | null = null; Ang_cadena: number | null = null;

  CalcularMcD(a: number, b: number) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  // engrane dientes rectos
  calcular_engRectos() {
    if (this.Modulo_recT === null)
      return;
    if (this.dientes_rect === null)
      return;

    this.Dp = parseFloat((this.Modulo_recT * this.dientes_rect).toFixed(2));
    this.De = parseFloat((this.Dp + (2 * this.Modulo_recT)).toFixed(2));
    const i_const = 1.167;
    this.i = parseFloat((i_const * this.Modulo_recT).toFixed(2));
    this.Di = parseFloat((this.Dp - (2 * this.i)).toFixed(2));
    const h_const = 2.167;
    this.h = parseFloat((h_const * this.Modulo_recT).toFixed(2));
    const r_cte = 0.3;
    this.r = parseFloat((r_cte * this.Modulo_recT).toFixed(2));
    this.p = parseFloat((Math.PI * this.Modulo_recT).toFixed(2));
    const cte = 0.5;
    this.e = cte * this.p;
    this.c = cte * this.p
    this.l = this.Modulo_recT

    if (this.Modulo_recT === null)
      return;
    if (this.dientes_pnn === null)
      return;
    if (this.rpm === null)
      return;
    if (this.dientes_rect === null)
      return;
    if (this.Dp === null)
      return;
    if (this.ang_pre === null)
      return;

    this.Dp_pn = parseFloat((this.Modulo_recT * this.dientes_pnn).toFixed(2));
    this.De_pn = parseFloat((this.Dp_pn + (2 * this.Modulo_recT)).toFixed(2));
    this.i = parseFloat((i_const * this.Modulo_recT).toFixed(2));
    this.Di_pn = parseFloat((this.Dp_pn - (2 * this.i)).toFixed(2));
    this.h_pn = parseFloat((h_const * this.Modulo_recT).toFixed(2));
    this.r_pn = parseFloat((r_cte * this.Modulo_recT).toFixed(2));
    this.p_pn = parseFloat((Math.PI * this.Modulo_recT).toFixed(2));
    this.e_pn = cte * this.p_pn;
    this.c_pn = cte * this.p_pn;
    this.l_pn = this.Modulo_recT;

    // relacion de transmisión Rt = Zp /Ze
    if (this.dientes_pnn > 0 && this.dientes_rect > 0) {
      const mcd = this.CalcularMcD(this.dientes_pnn, this.dientes_rect);
      const rel_pinon = this.dientes_pnn / mcd;
      const rel_engranaje = this.dientes_rect / mcd;
      this.Rt = `${rel_pinon}:${rel_engranaje}`;
    }
    // vel engrane
    this.vel = parseFloat(((this.dientes_pnn / this.dientes_rect) * this.rpm).toFixed(2));
    // distancia ente ejes
    this.x = parseFloat(((this.Dp + this.Dp_pn) / 2).toFixed(2));
    // Np
    const II_k = 2 * this.k;
    const angulo_presion = (this.ang_pre * Math.PI) / 180;
    const senoII = 3 * parseFloat(((Math.sin(angulo_presion)) ** 2).toFixed(3));
    const raiz = 1 + parseFloat((Math.sqrt(1 + (senoII))).toFixed(3));
    const Valor_np = II_k / senoII * raiz;

    this.Np = Math.ceil(Valor_np);
    // Np relación al módulo
    const mod_lo = this.Modulo_recT !== null ? Number(this.Modulo_recT) : 0
    const I_IIm = 1 + (2 * mod_lo)
    const op_seno = parseFloat((I_IIm * ((Math.sin(angulo_presion)) ** 2)).toFixed(2));
    const K_div_opseno = II_k / op_seno;
    const raiz_mod: number = mod_lo + parseFloat((Math.sqrt((mod_lo ** 2) + op_seno)).toFixed(2))
    this.Np_m = parseFloat((K_div_opseno * raiz_mod).toFixed(2))

    // ng
    const val_np: number = (Math.ceil(Valor_np) ** 2);
    const val_seno: number = parseFloat(((Math.sin(angulo_presion)) ** 2).toFixed(3))
    const cuatro_kdos: number = 4 * (this.k ** 2)
    const ctro_K = 4 * this.k
    this.Ng = parseFloat((((val_np * val_seno) - cuatro_kdos) / (ctro_K - ((2 * this.Np) * val_seno))).toFixed(2))

  }
  // engrane helicoidal
  calcular_helicoidal() {
    if (this.Mr_helic === null)
      return;
    if (this.Ang_helice === null)
      return;
    if (this.ang_pre_heli === null)
      return;
    if (this.Ze === null)
      return;
    if (this.Zp === null)
      return;
    if (this.rpm_heli === null)
      return;

    // Módulo aparente
    const angulo_helice: number = (this.Ang_helice * Math.PI) / 180;
    const M_aparente = parseFloat((this.Mr_helic / (Math.cos(angulo_helice))).toFixed(2));
    this.Ma_helic = M_aparente;
    // diametrp primitivo
    const Diametro_primitivo = parseFloat((M_aparente * this.Ze).toFixed(2));
    this.Dp_hel = Diametro_primitivo;
    // diametro exterior
    const Diametro_exterior = parseFloat((Diametro_primitivo + (2 * this.Mr_helic)).toFixed(2));
    this.De_hel = Diametro_exterior;
    // Espesor diente
    const espesor_diente = parseFloat((1.57 * this.Mr_helic).toFixed(2));
    this.Ec_heilc = espesor_diente;
    // altura diente
    const altura_diente = parseFloat((2.166 * this.Mr_helic).toFixed(2));
    this.H_heli = altura_diente;
    // Paso normal
    const pr_normal = parseFloat((Math.PI * this.Mr_helic).toFixed(2));
    this.Pr_helic = pr_normal;
    // paso aparente
    const paso_aparente: number = parseFloat((pr_normal / Math.cos(angulo_helice)).toFixed(2));
    this.Pa_helic = paso_aparente;
    // Paso helice
    const paso_helice = parseFloat(((Diametro_primitivo * (Math.PI)) / Math.tan(angulo_helice)).toFixed(2));
    this.p_helic = paso_helice;

    // piñon hélicoidal
    // Módulo aparente piñon
    const Ma_piñon = parseFloat((this.Mr_helic / (Math.cos(angulo_helice))).toFixed(2));
    this.Ma_helic_p = Ma_piñon;
    // diametrp primitivo
    const Dp_piñon = parseFloat((M_aparente * this.Zp).toFixed(2));
    this.Dp_hel_p = Dp_piñon;
    // diametro exterior
    const De_piñon = parseFloat((Dp_piñon + (2 * this.Mr_helic)).toFixed(2));
    this.De_hel_p = De_piñon;
    // Espesor diente
    const espesor_diente_piñon = parseFloat((1.57 * this.Mr_helic).toFixed(2));
    this.Ec_heilc_p = espesor_diente_piñon;
    // altura diente
    const altura_diente_piñon = parseFloat((2.166 * this.Mr_helic).toFixed(2));
    this.H_heli_p = altura_diente_piñon;
    // Paso normal
    const pr_normal_piñon = parseFloat((Math.PI * this.Mr_helic).toFixed(2));
    this.Pr_helic_p = pr_normal_piñon;
    // paso aparente
    const paso_aparente_piñon: number = parseFloat((pr_normal_piñon / Math.cos(angulo_helice)).toFixed(2));
    this.Pa_helic_p = paso_aparente_piñon;
    // Paso helice
    const paso_helice_piñon = parseFloat(((Diametro_primitivo * (Math.PI)) / Math.tan(angulo_helice)).toFixed(2));
    this.p_helic_p = paso_helice_piñon;
    // Ángulo presión transversal
    const angulo_presion = (this.ang_pre_heli * Math.PI) / 180;
    const presion_transversal = parseFloat((Math.atan(Math.tan(angulo_presion / Math.cos(angulo_helice)))).toFixed(2));
    const grados_pre_trans = parseFloat((presion_transversal * (180 / Math.PI)).toFixed(2))
    this.pre_transversal = grados_pre_trans;
    // Relación Transmisión 
    // relacion de transmisión Rt = Zp /Ze
    if (this.Zp > 0 && this.Ze > 0) {
      const mcd = this.CalcularMcD(this.Zp, this.Ze);
      const rel_pinon = this.Zp / mcd;
      const rel_engranaje = this.Ze / mcd;
      this.Rt_heli = `${rel_pinon}:${rel_engranaje}`;
    }
    // Velocidad del engranaje
    this.vel_pnn = parseFloat(((this.Zp / this.Ze) * this.rpm_heli).toFixed(2));
    // Np 
    const dosK_cos = ((2 * this.k_pnn) * (Math.cos(angulo_helice)));
    const senoDos = 3 * ((Math.sin(presion_transversal)) ** 2);
    const RaizNp = 1 + (Math.sqrt(1 + senoDos));
    const res_NP = (dosK_cos / senoDos) * RaizNp;
    this.NP_hel_p = Math.ceil(res_NP);
    // Ng
    const angulo_presion_helice = (this.Ang_helice * Math.PI) / 180;
    const NpDos = Math.ceil(res_NP) ** 2;
    const senDos = (Math.sin(presion_transversal) ** 2);
    const IV_KDos = 4 * (this.k_pnn) ** 2;
    const cosDos = (Math.cos(angulo_presion_helice) ** 2);
    const cuatro_k = 4 * this.k_pnn;
    const cos = Math.cos(angulo_presion_helice);
    const II_Np = 2 * this.NP_hel_p;
    const ng_res = Math.ceil(((NpDos * senDos) - (IV_KDos * cosDos)) / ((cuatro_k * cos) - (II_Np * senDos)))
    this.Ng_hel_p = ng_res

  }
  // engrane cadena
  calcular_cadena() {
    if (this.Dientes_cdn === null)
      return;
    if (this.Paso_cadena === null)
      return;
    if (this.Diam_rodillos === null)
      return;
    // angulo alfa
    const alfa = 180 / this.Dientes_cdn;
    this.Ang_cadena = alfa
    //  diametro primitivo
    const sen_alfa = (this.Ang_cadena * Math.PI) / 180;
    const p_sen = this.Paso_cadena / (Math.sin(sen_alfa));
    this.Dp_rod = parseFloat((p_sen).toFixed(2));
    // diámetro exterior recomendado
    const dp_numero= this.Dp_rod !==null ? Number(this.Dp_rod):0
    const d_rollido = this.Diam_rodillos !==null ? Number(this.Diam_rodillos):0
    const De_recomd:number = dp_numero + d_rollido;
    this.Der = De_recomd;
    // Diametro exterior
    const cte_d = 0.63 * this.Diam_rodillos;
    const Dp_x_cte = this.Dp_rod + cte_d;
    this.De_rod = Dp_x_cte;
    // diametro interior
    const Dp_m_d = this.Dp_rod + this.Diam_rodillos;
    this.Di_rod = Dp_m_d;
  }
















}




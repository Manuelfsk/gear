import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  startmenu: boolean = true;

  ocultar_Menu() {
    if(this.startmenu == true){
      this.startmenu = false
      let mimenu:any = document.getElementById("mimenu")
      mimenu.style.display = 'none'
      
    }else{
      this.startmenu= true
      let mimenu:any = document.getElementById("mimenu")
      mimenu.style.display = 'inline'
      
    }
  }
}

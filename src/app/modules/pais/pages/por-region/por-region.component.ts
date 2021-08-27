import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {
  public regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  public regionActiva: string = '';
  public paises: Country[] = [];
  constructor(private readonly paisService: PaisService) { }

  ngOnInit(): void {
  }


  public activarRegion(region: string) {
    console.log(region);
    if(region===this.regionActiva){
      return;
    }
    this.regionActiva = region;
    this.paises=[];
    this.paisService.getPaisByRegion(region)
      .subscribe(
        (paises)=>{
          console.log(paises);
          this.paises=paises;
        }
      )

  }
  public getClassRegionActiva(region:string):string{
    return (region!==this.regionActiva)?
      'btn-outline-primary mr-1':
      'btn mr-1 btn-primary';
  }
}

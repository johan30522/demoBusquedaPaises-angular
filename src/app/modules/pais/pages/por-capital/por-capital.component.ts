import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  public termino:string="";
  public existeError:boolean=false;
  public paisesSearch:Country[]=[];
  public tipoBusqueda:string='Capital';

  constructor(private readonly paisService:PaisService) { }

  ngOnInit(): void {
  }

  public buscar=(termino:string)=>{
    this.termino=termino;
    this.paisService.getCapital(this.termino)
      .subscribe(
        (paises)=>{
          console.log(paises);
          this.existeError=false;
          this.paisesSearch=paises;
        },
        (error)=>{
          this.existeError=true;
          console.log(error);
          this.paisesSearch=[];
        }
      )
  }
  public sugerencias(termino:string){
    console.log('termino en padre:' + termino);
    this.existeError=false;
  }

}

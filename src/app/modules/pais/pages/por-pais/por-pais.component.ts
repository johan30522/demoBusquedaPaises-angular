import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`li {
    cursor: pointer;
}`]
})
export class PorPaisComponent implements OnInit {
  public termino:string="";
  public existeError:boolean=false;
  public paisesSearch:Country[]=[];
  public tipoBusqueda:string='País';
  public paisesSugeridos:Country[]=[];



  constructor(private readonly paisService:PaisService) { }

  ngOnInit(): void {
  }

  public buscar=(termino:string)=>{
    this.termino=termino;
    this.paisService.getPais(this.termino)
      .subscribe(
        (paises)=>{
          console.log(paises);
          this.existeError=false;
          this.paisesSearch=paises;
          this.paisesSugeridos=[];
        },
        (error)=>{
          this.existeError=true;
          console.log(error);
          this.paisesSearch=[];
          this.paisesSugeridos=[];
        }
      )
  }
  public sugerencias(termino:string){
    //this.paisesSugeridos=[];
    this.existeError=false;
    this.termino=termino;
    this.paisService.getPais(termino)
      .subscribe(
        (result)=>{
          this.paisesSugeridos=result.splice(0,5);
        },        
        (err)=>{
          this.paisesSugeridos=[];
        })

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap,tap} from 'rxjs/operators';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private readonly paisService: PaisService) {

   }
  public idPais: string = "";
  public pais!: Country;


  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(
    //   (params) => {
    //     console.log(params.id);
    //     this.idPais = params.id;
    //     this.obtenerPais(this.idPais);
    //   }
    // )
   
    this.loadInfo();


  }
  public loadInfo(){
    this.activatedRoute.params
    .pipe(
      switchMap((param)=>this.paisService.getPaisById(param.id)),
      tap(console.log)
    )
    .subscribe(
      (resp) => {

        this.pais = resp;
        //console.log(this.pais);
      }
    )
  }
  public obtenerPais(codePais: string) {

    this.paisService.getPaisById(codePais)
      .subscribe((result: Country) => {
        console.log(result);
        this.pais = result;
      })

  }

}

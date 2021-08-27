import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [`
  .mt-0 {
  margin-top: 0 !important;
}

  `]
})
export class PaisInputComponent implements OnInit {
  @Input('elementoBusqueda') public tipoBusqueda:string="";
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  public termino: string = "";

  debouncer: Subject<String> = new Subject();


  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(
        (valor) => {
          this.onDebounce.emit(this.termino);
        }
      )
  } 

  public buscar() {
    this.onEnter.emit(this.termino);
  }
  public teclaPresionada() {
    this.debouncer.next(this.termino);

  }
}

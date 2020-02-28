import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'vrl-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  // valores recogidos desde el back
  @Input() config: any = [];
  @Input() header = [];
  @Input() data = [];
  @Input() footer = [];
  @Input() buttons = [];

  @Output() btnClick = new EventEmitter<any[]>();

  @ViewChild('dataTable', {static: true}) table;

  constructor() { }

  private url: string;
  private arrElementosSeleccionados = [];
  private allChecks = false;

  ngOnInit() {

    if (this.config.url && this.config.url !== '') {

      this.url = this.config.url;

    }

    console.log(this.table)

  }


  handleClickDelete(event) {
    // este botón debe eliminar un registro seleccionado de la tabla

  }

  handleClickUpdate(event) {
    // este botón lo que debe hacer es abrir un formulario con los datos cargados para modificar

  }

  handleClickAdd(event) {
    // este botón lo que debe hacer es abrir un nuevo formulario para añadir elementos
  }

  public elementSelected(id) {

    const index = this.arrElementosSeleccionados.indexOf(id);
    // comprobar si el elemento ya estaba seleccionado
    if (index > -1) {
      this.arrElementosSeleccionados.splice(index, 1);
    } else {
      this.arrElementosSeleccionados.push(id);
    }

  }

  public allSelected(event) {

    if (event.target.checked) {

      this.allChecks = true;

    } else {

      this.allChecks = false;
      this.arrElementosSeleccionados = [];

    }

  }

  private markAllSelected(marked: boolean) {

    if (marked) {
      // recorrer todos los checks y marcarlos si no estan marcados
      
    } else {
      // recorrer los checks y desmarcarlos

    }


  }


}

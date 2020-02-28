import { DataResponse } from './../../models/datatable/dataResponse';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

declare var $;

// https://medium.com/ramsatt/integrate-data-table-with-angular-8-application-with-json-backend-f1071feeb18f
@Component({
  selector: 'vrl-datatable2',
  templateUrl: './datatable2.component.html',
  styleUrls: ['./datatable2.component.css']
})
export class Datatable2Component implements OnInit {

  @Input() data: DataResponse; // datos para configurar la tabla

  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', {static: true}) table;

  constructor() { }

  ngOnInit() {

    // aquí obtenemos la información que queremos mostar en la tabla
    // se debería pasar al componenete a través de un input que debería 
    // extender el interface dataResponse
    this.tableData = this.data.data;
    // configuramos las opciones de la tabla
    this.dtOptions = {
      data: this.tableData, // los datos a mostrar en la tabla
      createdRow(row, data, index) {
        //console.log($('td', row))
        $('td', row).eq(0).css('color', 'red');
      },
      columnDefs: [
        { targets: [0], title: 'ID', data: 'id'},
        { targets: [1], title: 'Nombre', data: 'nombre'},
        { targets: [2], title: 'Apellidos', data: 'apellidos'},
        { targets: [3], title: 'E-Mail', data: 'email'},
        { targets: [4], title: 'Edad', data: 'edad',
          className: 'table-column-number',
          orderable: false,
          createdCell(td, cellData, rowData, row, col) {
            console.log(td)
          }
        }
      ]
    };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);

  }

}

import { DataAction } from './../../models/datatable/dataAction';
import { DataResponse } from './../../models/datatable/dataResponse';
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var $;

// https://medium.com/ramsatt/integrate-data-table-with-angular-8-application-with-json-backend-f1071feeb18f
@Component({
  selector: 'vrl-datatable2',
  templateUrl: './datatable2.component.html',
  styleUrls: ['./datatable2.component.css']
})
export class Datatable2Component implements OnInit {

  @Input() data: DataResponse; // datos para configurar la tabla
  @Input() showSelect = false;
  @Input() multiSelect = false;

  dataTable: any;
  dtOptions: any;
  tableData = [];

  buttons = [];

  showButtons = {
    upd: true,
    add: false,
    del: true
  };


  @ViewChild('dataTable', {static: true}) table;

  public selectedItems = [];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {

    // datos prueba
    this.buttons.push('delete');

    // si no tenemos seleccionado el select, el multiselect no se puede seleccionar
    if (!this.showSelect) {
      this.multiSelect = false;
    }

    this.cargarTabla();

  }



  public selectItems(id: any) {

    if (id === 'all') {

      const inputs  = document.querySelectorAll('input[type="checkbox"]');

      this.selectedItems = [];

      inputs.forEach(input => {

        $(this.document.getElementById(input.getAttribute('id'))).prop('checked', true);
        this.selectedItems.push(input.getAttribute('value'));

      });

      this.selectedItems.splice(0, 1);

    } else {

      const index = this.selectedItems.indexOf(id);

      // comprobar si el elemento ya estaba seleccionado
      if (index > -1) {

        this.selectedItems.splice(index, 1);
        $(this.document.getElementById('check_all')).prop('checked', false);

      } else {

        if (!this.multiSelect) {

          if (this.selectedItems.length > 0) {
            const idBorrar = this.selectedItems[0];
            this.selectedItems.splice(0, 1);
            $(this.document.getElementById('check_' + idBorrar)).prop('checked', false);

          }
        }

        this.selectedItems.push(id);
      }
    }

    if (this.selectedItems.length > 0) {

      // activamos los botones de upd y del
      if (this.showButtons.upd) {
        $(this.document.getElementById('btnUpd').childNodes[0]).prop('disabled', false);
      }
      if (this.showButtons.del) {
        $(this.document.getElementById('btnDel').childNodes[0]).prop('disabled', false);
      }

    } else {

      // desactivamos los botones de upd y del
      if (this.showButtons.upd) {
        $(this.document.getElementById('btnUpd').childNodes[0]).prop('disabled', true);
      }
      if (this.showButtons.del) {
        $(this.document.getElementById('btnDel').childNodes[0]).prop('disabled', true);
      }

    }
  }

  // control sobre el click de los botones
  public handleClickButton(id) {

    switch (id) {

      case 'add':

        break;

      case 'upd':

        break;

      case 'del':

        this.deleteItems();

        break;

      default:
        break;
    }

  }

  private deleteItems() {

    let dataResponse = new DataAction();
    dataResponse.action = 'del';
    dataResponse.data = this.selectedItems;

    console.log(dataResponse)

  }

  private cargarTabla() {

  // aquí obtenemos la información que queremos mostar en la tabla
    // se debería pasar al componenete a través de un input que debería
    // extender el interface dataResponse
    this.tableData = this.data.data;
    // configuramos las opciones de la tabla
    this.dtOptions = {
      data: this.tableData, // los datos a mostrar en la tabla
      createdRow(row, data, index) {
        // console.log($('td', row))
        // $('td', row).eq(0).css('color', 'red');
      },
      pageLength: 25,
      language: {
        processing:     'cargando...',
        search:         'Buscar',
        lengthMenu:    'Mostrar _MENU_ registros',
        info:           'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty:      'Mostrando 0 a 0 de 0 registros',
        infoFiltered:   '(filtrado de _MAX_ elementos en total)',
        infoPostFix:    '',
        loadingRecords: 'Cargando datos...',
        zeroRecords:    'No se han encontrado datos.',
        emptyTable:     'No se han encontrado datos',
        paginate: {
            first:      'Primer',
            previous:   'Anterior',
            next:       'Siguiente',
            last:       'Último'
        },
        aria: {
            sortAscending:  '',
            sortDescending: ''
        }
      },
      headerCallback( nHead, aData, iStart, iEnd, aiDisplay ) {

        let checkbox = '<div class="icheck-primary d-inline">';
        checkbox += '<input type="checkbox" id="check_all" value="all">';
        checkbox += '<label for="check_all">Todos</label>';
        checkbox += '</div>';

        $(nHead).find('th').eq(0).html(checkbox);
      },
      columnDefs: [
        { targets: [0], title: 'Todos', orderable: false, data: 'check',
          render( data, type, row, meta ) {

            let checkbox = '<div class="icheck-primary d-inline">';
            checkbox += '<input type="checkbox" id="check_' + row.id + '" value="' + row.id + '">';
            checkbox += '<label for="check_' + row.id + '"></label>';
            checkbox += '</div>';

            return checkbox;
          },
          visible: this.showSelect
        },
        { targets: [1], title: 'ID', data: 'id'},
        { targets: [2], title: 'Nombre', data: 'nombre'},
        { targets: [3], title: 'Apellidos', data: 'apellidos'},
        { targets: [4], title: 'E-Mail', data: 'email'},
        { targets: [5], title: 'Edad', data: 'edad',
          className: 'table-column-number',
          orderable: false,
          createdCell(td, cellData, rowData, row, col) {
            // console.log(td);
          }
        }
      ]
  };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);


    const inputs  = document.querySelectorAll('input[type="checkbox"]');

    inputs.forEach(input => {

      input.addEventListener('click', (event) => {

        this.selectItems(input.getAttribute('value'));

        }
      );

    });


  }


}

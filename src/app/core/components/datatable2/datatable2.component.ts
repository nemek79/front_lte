import { Header } from './../../models/datatable/header';
import { DataTableCfg } from './../../models/datatable/datatablecfg';
import { DatatableService } from './../../services/datatable.service';
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

  @Input() config: DataTableCfg;

  dataTable: any;
  dtOptions: any;
  tableData = [];

  showButtons = {
    upd: false,
    add: false,
    del: false
  };

  @ViewChild('dataTable', {static: true}) table;

  public selectedItems = [];

  constructor(
    private dataSRV: DatatableService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {

    // comprobar qué botones hay que mostrar
    for (const button of this.config.buttons) {

      switch (button) {

        case 'add':
          this.showButtons.add = true;
          break;
        case 'upd':
          this.showButtons.upd = true;
          break;
        case 'del':
          this.showButtons.del = true;
          break;

        default:
          break;
      }

    }

    // si no tenemos seleccionado el select, el multiselect no se puede seleccionar
    if (!this.config.showSelect) {
      this.config.multiSelect = false;
    }

    this.initHeader();

  }

  public selectItems(id: any) {

    if (id === 'all') {

      let value = $(this.document.getElementById('check_all')).prop('checked');

      const inputs  = document.querySelectorAll('input[type="checkbox"]');

      this.selectedItems = [];

      inputs.forEach(input => {

        $(this.document.getElementById(input.getAttribute('id'))).prop('checked', value);
        this.selectedItems.push(input.getAttribute('value'));

      });

      if (value) {
        this.selectedItems.splice(0, 1);
      } else {
        this.selectedItems = [];
      }

    } else {

      const index = this.selectedItems.indexOf(id);

      // comprobar si el elemento ya estaba seleccionado
      if (index > -1) {

        this.selectedItems.splice(index, 1);
        $(this.document.getElementById('check_all')).prop('checked', false);

      } else {

        if (!this.config.multiSelect) {

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

    if (this.selectedItems.length === 1) {

      this.dataSRV.deleteContacto(this.config.url, this.selectedItems[0]).subscribe(
        response => {

          this.selectedItems = [];

          this.dataSRV.getContactos(this.config.url).subscribe( data => {
            this.dataTable.DataTable().clear();
            this.dataTable.DataTable().rows.add(data);
            this.dataTable.DataTable().draw();

            this.loadDataEvents();

          });
        }
      );

    } else {

      this.dataSRV.deleteContactos(this.config.url, this.selectedItems).subscribe(
        response => {

          this.selectedItems = [];

          this.dataSRV.getContactos(this.config.url).subscribe( data => {
            this.dataTable.DataTable().clear();
            this.dataTable.DataTable().rows.add(data);
            this.dataTable.DataTable().draw();

            this.loadDataEvents();

          });
        }
      );

    }

    // desactivamos los botones de upd y del
    if (this.showButtons.upd) {
      $(this.document.getElementById('btnUpd').childNodes[0]).prop('disabled', true);
    }
    if (this.showButtons.del) {
      $(this.document.getElementById('btnDel').childNodes[0]).prop('disabled', true);
    }

  }

  private cargarTabla(header: any) {

    // aquí obtenemos la información que queremos mostar en la tabla
    this.dataSRV.getContactos(this.config.url).subscribe( response => {

      this.tableData = response;

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
        columnDefs: header
      };

      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);

      this.loadDataEvents();

    });

  }


  private initHeader() {

    let headers = [];
    let header: Header;

    const selectColumn = { targets: [0], title: 'Todos',
      render( data, type, row, meta ) {

        let checkbox = '<div class="icheck-primary d-inline">';
        checkbox += '<input type="checkbox" id="check_' + row.id + '" value="' + row.id + '">';
        checkbox += '<label for="check_' + row.id + '"></label>';
        checkbox += '</div>';

        return checkbox;
      }, orderable: false
    };

    headers.push(selectColumn);

    let index = 1;

    for (const obj of this.config.headers) {

      header = new Header();

      header.targets = [index];
      header.title = obj.title;
      header.data = obj.data;
      header.className = obj.className;
      header.orderable = obj.orderable;

      headers.push(header);
      index++;

    }

    this.cargarTabla(headers);

  }


  private loadDataEvents() {

    const inputs  = document.querySelectorAll('input[type="checkbox"]');

    inputs.forEach(input => {

      input.addEventListener('click', (event) => {

        this.selectItems(input.getAttribute('value'));

        }
      );

    });

  }

}

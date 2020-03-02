import { DataResponse } from './../../models/datatable/dataResponse';
import { DtConfig } from './../../models/datatable/dtconfig';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loading = false;

  public headerConfig = [
    {value: 'Identificación', id: 'id'},
    {value: 'Nombre', id: 'nombre'},
    {value: 'Apellidos', id: 'apellidos'},
    {value: 'E-mail', id: 'email'},
    {value: 'Edad', id: 'edad'}
  ];

  public tableCfg: DataResponse;

  public items = [
    {
      check: {value: false},
      id: {value: '71882560Q', type: 'string'},
      nombre: {type: 'string', value: 'David'} ,
      apellidos: {type: 'string', value: 'Alonso Sánchez'},
      email: {type: 'string' , value: 'davidalonso79@gmail.com'},
      edad: {type: 'number', value: 41}
    },
    {
      check: {value: false},
      id: {value: 'Y4428449C', type: 'string'},
      nombre: {type: 'string', value: 'Maira Ebelina'} ,
      apellidos: {type: 'string', value: 'Escalante Reyes'},
      email: {type: 'string' , value: 'mairaescalante1912@gmail.com'},
      edad: {type: 'number', value: 33}
    }
  ];

  public tableConfig: DtConfig;

  public tableButtons = {
    add: {label: 'Nuevo', click: 'addItem', show: true},
    update: {label: 'Actualizar', click: 'updateItem', show: false},
    delete: {label: 'Eliminar', click: 'deleteItem', show: true}
  };

  constructor(
    private navSRV: NavigationService
  ) {

    this.navSRV.hideLogin();
    this.tableConfig = new DtConfig();

    this.tableCfg = new DataResponse();

    this.tableCfg.page = 1;
    this.tableCfg.per_page = 25;
    this.tableCfg.total = 2;
    this.tableCfg.total_pages = 1;
    // this.tableCfg.data = [
    //   {
    //     id: {value: '71882560Q', type: 'string'},
    //     nombre: {type: 'string', value: 'David'} ,
    //     apellidos: {type: 'string', value: 'Alonso Sánchez'},
    //     email: {type: 'string' , value: 'davidalonso79@gmail.com'},
    //     edad: {type: 'number', value: 41}
    //   },
    //   {
    //     id: {value: 'Y4428449C', type: 'string'},
    //     nombre: {type: 'string', value: 'Maira Ebelina'} ,
    //     apellidos: {type: 'string', value: 'Escalante Reyes'},
    //     email: {type: 'string' , value: 'mairaescalante1912@gmail.com'},
    //     edad: {type: 'number', value: 33}
    //   }
    // ];
    this.tableCfg.data = [
      {
        check: false,
        id: '71882560Q',
        nombre: 'David' ,
        apellidos: 'Alonso Sánchez',
        email: 'davidalonso79@gmail.com',
        edad: 41
      },
      {
        check: false,
        id: 'Y4428449C',
        nombre: 'Maira Ebelina' ,
        apellidos: 'Escalante Reyes',
        email: 'mairaescalante1912@gmail.com',
        edad: 33
      }
    ];

  }

  ngOnInit() {

    // configuración de la tabla
    this.tableConfig.titulo = 'Demo configuración datatable';
    this.tableConfig.url = '/prueba';

  }

  handleClickButtons(event) {

    console.log(event);

  }

}

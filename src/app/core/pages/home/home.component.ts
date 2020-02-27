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

  public items = [
    {
      id: {value: '71882560Q', type: 'string'},
      nombre: {type: 'string', value: 'David'} ,
      apellidos: {type: 'string', value: 'Alonso Sánchez'},
      email: {type: 'string' , value: 'davidalonso79@gmail.com'},
      edad: {type: 'number', value: 41}
    },
    {
      id: {value: 'Y4428449C', type: 'string'},
      nombre: {type: 'string', value: 'Maira Ebelina'} ,
      apellidos: {type: 'string', value: 'Escalante Reyes'},
      email: {type: 'string' , value: 'mairaescalante1912@gmail.com'},
      edad: {type: 'number', value: 33}
    }
  ];

  public tableConfig: DtConfig;

  constructor(
    private navSRV: NavigationService
  ) {

    this.navSRV.hideLogin();
    this.tableConfig = new DtConfig();

  }

  ngOnInit() {

    // configuración de la tabla
    this.tableConfig.titulo = 'Demo configuración datatable';

  }

}

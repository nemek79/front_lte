import { DataTableCfg } from './../../models/datatable/datatablecfg';
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

  public dtCfg: DataTableCfg = new DataTableCfg();

  public arrButtons = ['add'];

  constructor(
    private navSRV: NavigationService
  ) {

    this.navSRV.hideLogin();

  }

  ngOnInit() {

    this.dtCfg.url = 'http://localhost:3000/personas';
    this.dtCfg.multiSelect = true;
    this.dtCfg.showSelect = true;
    this.dtCfg.buttons = ['add', 'upd', 'del'];

  }

  handleClickButtons(event) {

    console.log(event);

  }

}

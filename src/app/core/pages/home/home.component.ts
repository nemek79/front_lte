import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loading = false;

  constructor(
    private navSRV: NavigationService
  ) {

    this.navSRV.hideLogin();
  }

  ngOnInit() {


  }

  public handleClickButton(event) {

    this.loading = !this.loading;

  }

}

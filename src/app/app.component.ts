import { Component, OnInit } from '@angular/core';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public href: string;
  public isLogin = false;

  constructor(
    public navSRV: NavigationService
  ) {


  }

  ngOnInit(): void {

  }

}

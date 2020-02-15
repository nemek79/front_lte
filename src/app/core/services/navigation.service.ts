import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public header = false;
  public menuLeft = false;
  public footer = false;

  constructor() { }

  public showHeader() {
    this.header = true;
  }

  public hideHeader() {
    this.header = false;
  }

  public showMenuLeft() {
    this.menuLeft = true;
  }

  public hideMenuLeft() {
    this.menuLeft = false;
  }

  public showFooter() {
    this.footer = true;
  }

  public hideFooter() {
    this.footer = false;
  }

  public showLogin() {
    this.hideHeader();
    this.hideMenuLeft();
    this.hideFooter();
  }

  public hideLogin() {
    this.showHeader();
    this.showMenuLeft();
    this.showFooter();
  }

}

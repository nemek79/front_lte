import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './core/components/appheader/appheader.component';
import { MenutopComponent } from './core/components/menutop/menutop.component';
import { MenuleftComponent } from './core/components/menuleft/menuleft.component';
import { FooterComponent } from './core/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    MenutopComponent,
    MenuleftComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

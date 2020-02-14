import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Componentes de la aplicacion
import { AppComponent } from './app.component';
import { AppheaderComponent } from './core/components/appheader/appheader.component';
import { MenutopComponent } from './core/components/menutop/menutop.component';
import { MenuleftComponent } from './core/components/menuleft/menuleft.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './core/pages/home/home.component';

// Servicios
import { AuthService } from './core/services/security/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    MenutopComponent,
    MenuleftComponent,
    FooterComponent,
    HomeComponent,
    AuthService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { NavigationService } from './core/services/navigation.service';
import { LoginComponent } from './core/pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    MenutopComponent,
    MenuleftComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

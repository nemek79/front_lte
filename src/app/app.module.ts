import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './core/interceptors/LoaderInterceptor.service';

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
import { LoginComponent } from './core/pages/login/login.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { BtnloaderComponent } from './core/components/btnloader/btnloader.component';
import { DatatableComponent } from './core/components/datatable/datatable.component';
import { Datatable2Component } from './core/components/datatable2/datatable2.component';

// Servicios
import { AuthService } from './core/services/security/auth.service';
import { NavigationService } from './core/services/navigation.service';
import { LoaderService } from './core/services/loader.service';
import { DatatableService } from './core/services/datatable.service';


@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    MenutopComponent,
    MenuleftComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    BtnloaderComponent,
    DatatableComponent,
    Datatable2Component
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
    NavigationService,
    LoaderService,
    DatatableService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

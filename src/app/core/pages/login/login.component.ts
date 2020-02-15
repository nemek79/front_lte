import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/security/auth.service';
import { Usuario } from '../../models/security/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    private navSRV: NavigationService,
    private authSRV: AuthService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.navSRV.showLogin();
  }


  login(): void {

    console.log('=========> login');

    this.authSRV.login(this.usuario).subscribe( response => {


      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);


    }, err => {

      if (err.error.error === 'unauthorized' || err.error.error === 'invalid_grant') {
        console.log('credeciales no son correctas');
      } else {
        console.log('Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación');
      }

    });

  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/security/auth.service';
import { Usuario } from '../../models/security/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // https://academia-binaria.com/formularios-reactivos-con-Angular/

  public usuario: Usuario;
  public formGroup: FormGroup;

  constructor(
    private navSRV: NavigationService,
    private authSRV: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.buildForm();
    this.navSRV.showLogin();
  }


  login(): void {

    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    console.log(this.formGroup);
    this.usuario.username = this.formGroup.value.username;
    this.usuario.password = this.formGroup.value.password;
    console.log(this.usuario);
    this.authSRV.login(this.usuario).subscribe( response => {


      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

    }, err => {

      if (err.error.error === 'unauthorized' || err.error.error === 'invalid_grant') {
        console.log('credeciales no son correctas');
        Toast.fire({
          type: 'error',
          title: 'Las credenciales no son correctas'
        })
      } else {
        console.log('Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación');
        Toast.fire({
          type: 'error',
          title: 'Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación'
        });
      }

    });

  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}

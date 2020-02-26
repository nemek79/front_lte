import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/security/auth.service';
import { Usuario } from '../../models/security/usuario';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // https://academia-binaria.com/formularios-reactivos-con-Angular/

  Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  public usuario: Usuario;
  public formGroup: FormGroup;
  public modify: boolean = false;
  public loading = false;

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

    this.modify = true;

    if (!this.checkFormulario()) {

      return;
    }

    this.usuario.username = this.formGroup.value.username;
    this.usuario.password = this.formGroup.value.password;

    this.loading = true;

    this.authSRV.login(this.usuario).subscribe( response => {


      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.loading = false;

    }, err => {

      if (err.error.error === 'unauthorized' || err.error.error === 'invalid_grant') {

        this.Toast.fire({
          type: 'error',
          title: 'Las credenciales no son correctas'
        });
      } else {
        this.Toast.fire({
          type: 'error',
          title: 'Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación'
        });
      }

      this.loading = false;
    });

  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }

    return error;
  }

  public displayCssFor(field: string|Array<string>): string {

    let classError = '';

    // this.formGroup.get(field).invalid && this.modify && (this.formGroup.get(field).touched || this.formGroup.get(field).dirty)

    if (this.formGroup.get(field).invalid && this.modify) {
      classError = 'is-invalid';
    }

    return classError;
  }

  private checkFormulario() {

    if (this.formGroup.status === 'INVALID') {

      this.Toast.fire({
        type: 'warning',
        title: 'Por favor resvisa el formulario, alguno de sus campos no es correcto'
      });
      return false;
    }

    return true;

  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), this.validatePassword]]
    });
  }

  private validatePassword(control: AbstractControl) {

    const password = control.value;
    let error = null;
    /*
    if (!password.includes('$')) {
      error = { ...error, dollar: 'needs a dollar symbol' };
    }
    if (!parseFloat(password[0])) {
      error = { ...error, number: 'must start with a number' };
    }
    */
    return error;
  }

}

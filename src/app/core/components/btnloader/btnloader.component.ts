import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'vrl-btnloader',
  templateUrl: './btnloader.component.html',
  styleUrls: ['./btnloader.component.css']
})
export class BtnloaderComponent implements OnInit, OnChanges {

  @Input() label = '';
  @Input() id = '';
  @Input() iconbtn = '';
  @Input() loading = false;
  @Input() classbtn = '';
  @Input() iconpos = ''; // left / right
  @Input() btndisabled = 'true';

  @Output() clicked = new EventEmitter<any[]>();

  iconInit = 'undefined';
  public disablebtn = '';
  public posleft = false;
  public posright = false;

  constructor() { }

  ngOnInit() {

    if (!this.label || this.label === '') {
      this.label = 'empty';
    }

    if (!this.iconbtn || this.iconbtn === '') {
      this.iconbtn = 'undefined';
    } else {
      this.iconInit = this.iconbtn;
    }

    if (this.iconpos === 'left') {
      this.posleft = true;
      this.posright = false;
    } else if (this.iconpos === 'right') {
      this.posleft = false;
      this.posright = true;
    } else {
      this.posleft = false;
      this.posright = false;
    }


  }

  ngOnChanges(changes: SimpleChanges): void {

    // cuando se produce un cambio en alguna propiedad, comprobamos si tenemos que 
    // realizar alguna acción
    for (let property in changes) {

      // comprobamos si está cargado
      if (property === 'loading' ) {
        if ( changes[property].currentValue === 'true' &&  changes[property].previousValue === 'false') {
          this.iconbtn = 'fa fa-spin fa-spinner';
        } else if ( changes[property].currentValue === 'false' &&  changes[property].previousValue === 'true') {
          this.iconbtn =  this.iconInit;
        }
      }

    }

  }

  handleClick(event): void {

    this.clicked.emit(event);

  }

}

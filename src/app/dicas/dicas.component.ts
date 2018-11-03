import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'
import { Http } from '@angular/http';

import { Dicas } from '../shared/dicas.model'

@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.component.html',
  styleUrls: ['./dicas.component.scss'],
  providers: [Dicas]
})
export class DicasComponent implements OnInit {

	slimScrollOptions: any
  @Input() parameters: string;

  public dicas: Array<Dicas> = []

  public selectedDicas = new Dicas();

  constructor(private router: Router, private http:Http, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  	this.slimScrollOptions = {
      height: '161px',
      color: '#0de38f',
      opacity: '1.5',
      size: '15px'
    }
    this.http.get('assets/dicas.json').subscribe(res => {
      this.dicas = res.json().dicas;
      this.selectedDicas = this.dicas[0]
      this.ref.markForCheck();
    });
  
  }

    getDica(dica: Dicas) {
      this.selectedDicas = dica
    }

  }
  

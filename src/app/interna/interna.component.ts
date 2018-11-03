import { Component, OnInit, OnChanges, ViewChild, SimpleChange, ComponentFactoryResolver } from '@angular/core';
import { MoodboardComponent } from '../moodboard/moodboard.component';
import { PlanosComponent } from '../planos/planos.component';
import { EmailsComponent } from '../emails/emails.component';
import { MuralComponent } from '../mural/mural.component';
import { DicasComponent } from '../dicas/dicas.component';
import { ElementosComponent } from '../elementos/elementos.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { InternaDirective } from './interna-host.directive'
import { Router } from '@angular/router'
import {LocationStrategy} from '@angular/common';

@Component({
	selector: 'app-interna',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
	<ng-template appInterna></ng-template>
	`,
	styleUrls: ['./interna.component.scss'],
	entryComponents: [
	MoodboardComponent,
	PlanosComponent,
	EmailsComponent,
	MuralComponent,
	DicasComponent,
	ElementosComponent
	],
})

export class InternaComponent implements OnChanges {

	@ViewChild(InternaDirective) interna: InternaDirective;

	public parametro

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private router: Router, 
		private url:LocationStrategy) {

	}

	ngOnInit() {
		this.loadInternaComponent();
	}

	// se as propriedades @Input forem alteradas, carrega componente (angular) do widget
	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		this.loadInternaComponent();
	}


	getInterna (interna: string): any {
		switch (interna) {
			case 'moodboard' : 
			return MoodboardComponent

			case 'planos' :
			return PlanosComponent

			case 'emails' : 
			return EmailsComponent

			case 'mural' :
			return MuralComponent

			case 'dicas' :
			return DicasComponent

			case 'elementos' :
			return ElementosComponent
		}
	}

	// carrega dinamicamente o componente do widget
	loadInternaComponent() {
		let currentUrl = this.url.path();

		var fields = currentUrl.split('?');
		var link = fields[0];
		var par = fields[1];
		var link2 = link.split('/');

		if(link2 && link2.length > 0) {
			link = link2[link2.length-1]
		}

		if (currentUrl.includes('=')) {
			let param = par.split('=');
			this.parametro = param[1];
		} else {
			this.parametro = currentUrl
		}


		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getInterna(link))

		const viewContainerRef = this.interna.viewContainerRef;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent(componentFactory);
		(<any>componentRef.instance).parameters = this.parametro;
	}
}




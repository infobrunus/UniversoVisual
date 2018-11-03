import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

import { Thumbs } from '../shared/thumbs.model'

@Component({
	selector: 'app-planos',
	templateUrl: './planos.component.html',
	styleUrls: ['./planos.component.scss'],
	providers: [Thumbs]
})
export class PlanosComponent implements OnInit {

	slimScrollOptions: any
	@Input() parameters: string;

	public thumbs: Array<Thumbs> = []

	public selectedThumb = new Thumbs();

	constructor(private http:Http, private ref: ChangeDetectorRef) {}

	ngOnInit() {
		this.slimScrollOptions = {
			height: '170px',
			color: '#0de38f',
			opacity: '1.5',
			size: '15px'
		}
		this.http.get('assets/thumbs.json').subscribe(res => {
			this.thumbs = res.json().thumbs;
			this.selectedThumb = this.thumbs[0]
			this.ref.markForCheck();
		});
		this.selectedThumb.linkThumb = []
	}

	getThumb(thumb: Thumbs) {
		this.selectedThumb = thumb
	}

}
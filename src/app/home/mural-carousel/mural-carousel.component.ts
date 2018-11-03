import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Http } from '@angular/http';
import { Mural } from './mural.model'
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-mural-carousel',
	templateUrl: './mural-carousel.component.html',
	styleUrls: ['./mural-carousel.component.scss'],
	providers: [NgbCarouselConfig, Mural]
})

export class MuralCarouselComponent implements OnInit {

	public mural:Array<Mural> = [];

	constructor(config: NgbCarouselConfig, private http:Http, mural: Mural,
		private route: ActivatedRoute,
		private router: Router) {
		config.wrap = false;
		config.keyboard = false;
	}

	ngOnInit() {
		this.http.get('assets/info-dicas.json')
		.subscribe(res => {
			this.mural = res.json().dicas;
		});
	}

	leiaMaisClick (mural: Mural) {
		this.router.navigate(['mural'], {queryParams: {'mural': mural.id}})
	}

}



import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Http } from '@angular/http';

import { Items } from '../shared/items.model'

@Component({
	selector: 'app-elementos',
	templateUrl: './elementos.component.html',
	styleUrls: ['./elementos.component.scss'],
	providers: [Items]
})

export class ElementosComponent implements OnInit {

	slimScrollOptions: any
	@Input() parameters: string;

	public items: Array<Items> = []

	public selectedItem = new Items();

	constructor(private router: Router, private route: ActivatedRoute, private http:Http, private ref: ChangeDetectorRef) { }

	ngOnInit() {
		this.slimScrollOptions = {
			height: '161px',
			color: '#0de38f',
			opacity: '1.5',
			size: '15px'
		}
		this.http.get('assets/items.json').subscribe(res => {
			this.items = res.json().items;
			this.selectedItem = this.items[0];
			
			this.route.queryParams.subscribe(params => {      
				if (params['elemento']) {
					const itemParam = this.items.find(item => item.key === params['elemento']);
					if (itemParam) {
						this.selectedItem = itemParam;
					}
				}
			});

			this.ref.markForCheck();
		});
		this.selectedItem.linkItem = ""
	}

	getItem(item: Items) {
		this.selectedItem = item
		this.parameters
	}
}

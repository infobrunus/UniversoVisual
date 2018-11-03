import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../../shared/items.model'
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-interna-elementos',
	templateUrl: './interna-elementos.component.html',
	styleUrls: ['./interna-elementos.component.scss']
})
export class InternaElementosComponent implements OnInit {

	pdfSrc: string

	constructor(private http:Http) { }

	ngOnInit() {
		
	}

	_parameters: Items;
	get parameters(): Items {
		return this._parameters;
	}

	@Input('parameters')
	set parameters(value: Items) {
		this._parameters = value;
	}

	_selectedItem: Items;
	get selectedItem(): Items {
		return this._selectedItem;
	}

	@Input('selectedItem')
	set selectedItem(value: Items) {
		this._selectedItem = value;
		this.pdfSrc = this.selectedItem.linkItem;
		if (!this.parameters) { 
			this.parameters = this.selectedItem[0] 
		}
	}

	saveItem() {

		this.http.get(this.selectedItem.linkDownload, { responseType: ResponseContentType.Blob }) 
		.map(r => r.blob()) 
		.subscribe(response => {
			saveAs(response, this.selectedItem.nome)
		 });
	}

}

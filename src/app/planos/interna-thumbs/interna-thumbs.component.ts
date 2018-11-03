import { Component, OnInit, Input } from '@angular/core';
import { Thumbs } from '../../shared/thumbs.model'
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-interna-thumbs',
	templateUrl: './interna-thumbs.component.html',
	styleUrls: ['./interna-thumbs.component.scss']
})
export class InternaThumbsComponent implements OnInit {
	slimScrollOptions: any

	constructor(private http:Http) {

	}

	ngOnInit() {
		this.slimScrollOptions = {
			height: '260px',
			color: '#ed1263',
			opacity: '1.5',
			size: '15px'
		}
	}

	_selectedThumb: Thumbs;
	get selectedThumb(): Thumbs {
		return this._selectedThumb;
	}

	@Input('selectedThumb')
	set selectedThumb(value: Thumbs) {
		this._selectedThumb = value;
	}

	saveThumb() {

		this.http.get(this.selectedThumb.linkDownload, { responseType: ResponseContentType.Blob }) 
		.map(r => r.blob()) 
		.subscribe(response => {
			saveAs(response, this.selectedThumb.nome)
		 });

	}


}

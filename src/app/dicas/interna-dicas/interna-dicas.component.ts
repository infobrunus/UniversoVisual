import { Component, OnInit, Input } from '@angular/core';
import { Dicas } from '../../shared/dicas.model'
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-interna-dicas',
	templateUrl: './interna-dicas.component.html',
	styleUrls: ['./interna-dicas.component.scss']
})
export class InternaDicasComponent implements OnInit {

	@Input() parameters: string;
	pdfSrc: string

	constructor(private http:Http) { }

	ngOnInit() {
	}

	_selectedDicas: Dicas;
	get selectedDicas(): Dicas {
		return this._selectedDicas;	
	}

	@Input('selectedDicas')
	set selectedDicas(value: Dicas) {
		if (value) {
			this._selectedDicas = value;
			this.pdfSrc = this.selectedDicas.linkDica;
		}	
	}

	saveDica() {
		const linkdownload = this.selectedDicas.linkDownload
		this.http.get(this.selectedDicas.linkDownload, { responseType: ResponseContentType.Blob }) 
		.map(r => r.blob()) 
		.subscribe(response => {
			saveAs(response, this.selectedDicas.nome)
		});
	}

}

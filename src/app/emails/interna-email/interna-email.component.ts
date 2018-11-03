import { Component, OnInit, Input } from '@angular/core';
import { Emails } from '../../shared/emails.model'
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-interna-email',
	templateUrl: './interna-email.component.html',
	styleUrls: ['./interna-email.component.scss']
})
export class InternaEmailComponent implements OnInit {

	pdfSrc: string

	constructor(private http:Http) { }

	ngOnInit() {
	}

	_parameters: Emails;
	get parameters(): Emails {
		return this._parameters;
	}

	@Input('parameters')
	set parameters(value: Emails) {
		this._parameters = value;
	}

	_selectedEmail: Emails;
	get selectedEmail(): Emails {
		return this._selectedEmail;
	}

	@Input('selectedEmail')
	set selectedEmail(value: Emails) {
		this._selectedEmail = value;
		this.pdfSrc = this.selectedEmail.linkEmail;
		if (!this.parameters) { 
			this.parameters = this.selectedEmail[0] 
		}
	}

	saveEmail() {

		this.http.get(this.selectedEmail.linkDownload, { responseType: ResponseContentType.Blob }) 
		.map(r => r.blob()) 
		.subscribe(response => {
			saveAs(response, this.selectedEmail.nome)
		 });
	}

}

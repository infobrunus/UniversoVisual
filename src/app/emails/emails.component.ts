import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Http } from '@angular/http';

import { Emails } from '../shared/emails.model'

@Component({
	selector: 'app-emails',
	templateUrl: './emails.component.html',
	styleUrls: ['./emails.component.scss'],
	providers: [ Emails ]
})
export class EmailsComponent implements OnInit {

	slimScrollOptions: any
	@Input() parameters: string;

	public emails: Array<Emails> = []

	public selectedEmail = new Emails();

	constructor(private router: Router, private route: ActivatedRoute, private http:Http, private ref: ChangeDetectorRef) { }

	ngOnInit() {
		this.slimScrollOptions = {
			height: '161px',
			color: '#0de38f',
			opacity: '1.5',
			size: '15px'
		}
		this.http.get('assets/emails.json').subscribe(res => {
			this.emails = res.json().emails;
			this.selectedEmail = this.emails[0];

			this.route.queryParams.subscribe(params => {      
				if (params['emails']) {
					const emailParam = this.emails.find(email => email.key === params['emails']);
					if (emailParam) {
						this.selectedEmail = emailParam;
					}
				}
			})

			this.ref.markForCheck();
		})

		this.selectedEmail.linkEmail = ""
	}

	getEmail(email: Emails) {
		this.selectedEmail = email
		this.parameters
	}

}

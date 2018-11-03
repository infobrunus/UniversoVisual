import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Http } from '@angular/http';
import { saveAs } from 'file-saver';
import { ResponseContentType, Response } from '@angular/http';
import { Moods } from '../shared/mood.model'

@Component({
	selector: 'app-moodboard',
	templateUrl: './moodboard.component.html',
	styleUrls: ['./moodboard.component.scss'],
	providers: [Moods]
})

export class MoodboardComponent implements OnInit {

	@Input() parameters: string;

	public moods: Array<Moods> = []
  public slimScrollOptions: any;
	public selectedMood = new Moods();

	constructor(private router: Router, private route: ActivatedRoute, private http:Http, private ref: ChangeDetectorRef) { }

	pdfSrc: string = 'assets/moodboard/MOOD2018.pdf';

	ngOnInit() {

    this.slimScrollOptions = {
			height: '161px',
			color: '#0de38f',
			opacity: '1.5',
			size: '15px'
		}

		this.http.get('assets/mood.json').subscribe(res => {
			this.moods = res.json().moods;
			this.selectedMood = this.moods[0];
			this.route.queryParams.subscribe(params => {   
				if (params['mood']) {
					const moodParam = this.moods.find(mood => mood.key === params['mood']);
					if (moodParam) {
						this.selectedMood = moodParam;
					}
				}
			});

			this.ref.markForCheck();
		});
		this.selectedMood.linkMood = ""
	}

	getMood(mood: Moods) {
		this.selectedMood = mood;
		this.parameters;
	}


	/*_parameters: Moods;
	get parameters(): Moods {
		return this._parameters;
		console.log('log1');
	}*/

	/*@Input('parameters')
	set parameters(value: Moods) {
		this._parameters = value;
		console.log('log2')
	}*/

	/*_selectedMood: Moods;
	get selectedMood(): Moods {
		return this._selectedMood;
		console.log('log3')
	}*/

	/*@Input('selectedMood')
	set selectedMood(value: Moods) {
		this._selectedMood = value;
		//this.pdfSrc = this.selectedMood.linkMood;
		console.log('log4')
	}*/

	saveMood() {
		console.log('log6');
		this.http.get(this.selectedMood.linkDownload, { responseType: ResponseContentType.Blob }) 
		.map(r => r.blob()) 
		.subscribe(response => {
			saveAs(response, this.selectedMood.nome)
		 });
	}

}

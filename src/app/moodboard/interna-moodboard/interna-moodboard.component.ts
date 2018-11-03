import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Moods } from '../../shared/mood.model'
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
	selector: 'app-interna-moodboard',
	templateUrl: './interna-moodboard.component.html',
	styleUrls: ['./interna-moodboard.component.scss']
})
export class InternaMoodboardComponent implements OnInit {

	constructor() {}

	ngOnInit() {}

}

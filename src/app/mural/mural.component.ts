import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MuralCarouselComponent } from '../home/mural-carousel/mural-carousel.component'
import { Http } from '@angular/http';
import { Mural } from '../home/mural-carousel/mural.model'
import { Datas } from '../shared/data.model'
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'
import { CustomDateFormatter } from './custom-date-formatter.provider';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarViewPeriod,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewDay
} from 'angular-calendar';
import { Data } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-mural',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss'],
  providers: [
    Mural,
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    Datas
  ]
})
export class MuralComponent implements OnInit {

  public murais: Array<Mural> = [];
  public dateString: string
  public muralDate: Mural
  public redirect: Mural;
  private selectedDay: CalendarMonthViewDay;
  public loadCalendar: boolean;

  events: CalendarEvent[] = [{ title: 'Event 1', color: { primary: '#ecc133', secondary: '#ecc133' }, start: new Date() }];

  // public events: CalendarEvent[] = []
  locale: string = 'pt';
  @Input() parameters: string;

  public datas: Array<Datas> = []
  public meses: Array<Datas> = []
  public anos: Array<Datas> = []
  public selectedData = new Datas();

  // Calendário 

  view: string = 'month';
  viewDate: Date = new Date();
  period: CalendarViewPeriod;

  currentMonth = 0
  currentYear = 0

  pegarMes: Date = new Date();
  pegarAno: Date = new Date();

  refresh: Subject<any> = new Subject();

  constructor(private router: Router, private route: ActivatedRoute, private http: Http, private ref: ChangeDetectorRef) { }


  // Primeiro: Setar dropdown pra data do evento
  // Segundo: dia atual será dia do evento
  // Terceiro: chamar função que retorna os dados daquele dia

  ngOnInit() {
    this.http.get('assets/data.json').subscribe(res => {
      this.meses = res.json().meses;
      this.anos = res.json().anos;
      this.ref.markForCheck();
      this.currentMonth = this.pegarMes.getMonth()
      this.currentYear = this.pegarAno.getFullYear()
    });

    this.http.get('assets/info-dicas.json')
    .subscribe(res => {
      this.murais = res.json().dicas;
	  
	  this.refresh.next();

      // dá um subscribe nos parametros da roda
      this.route.queryParams.subscribe(params => {

        // se tiver o parametro mural
        if (params['mural']) {

          // pesquisa na array de murais já carregada o mural pelo id enviado
          const itemParam = this.murais.find(mural => mural.id === +params['mural']);

          // se encontrou um mural com aquel eid
          if (itemParam) {

            // da um split na data para pegar mes e ano
            const date = itemParam.date.split('/');
            const mes = (+date[1]) - 1;
            const ano = +date[2];

            // seta mes e ano atual do dropdown
            this.currentMonth = mes;
            this.currentYear = ano;

            // cria objeto de data para eviar para o método getData
            const dateObject = new Date();
            dateObject.setFullYear(ano);
            dateObject.setMonth(mes);
            dateObject.setDate(+date[0]);

            // pega os dados do mural do parametro para exibir no lado direito
            this.getData(dateObject);

            // seta mes e ano do calendário para visualizar ele com a data do parametro enviado
            //this.viewDate.setMonth(mes);
            //this.viewDate.setFullYear(ano);

            this.viewDate = dateObject;

            this.ref.markForCheck();
          } else {
            const today = new Date();
            this.viewDate = today;
            this.getData(today);
          }

          this.refresh.next();
        }
      });

      this.ref.markForCheck();
    });
  }

  // função que é chamada antes de renderizar o calendário
  viewRender({ body }: { body: CalendarMonthViewDay[] }) {

    // faz um loop em todos os dias do calendário a serem exibidos
    body.forEach(day => {

      // pega o dia e formata como string para poder ver se a data consta no mural
      const dateCalendarFormatted: string = this.dateToString(day.date);

      // pesquisa no mural se possui algo na data informada
      const dateMural = this.murais.find(mural => mural.date === dateCalendarFormatted);

      // se possuir algo no mural nessa data, seta classe para o dia
      if (dateMural) {
        day.cssClass = 'hasSomething';
      }
    });
  }

  getData(date: Date) {
    this.dateString = this.dateToString(date);
    this.muralDate = this.murais.find(event => event.date === this.dateString);
  }

  // função que pega objeto data e retorna data formatada como string
  dateToString(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return dd + '/' + mm + '/' + yyyy;
  }

  // função que pega o dia clicado
  dayClicked(day: CalendarMonthViewDay): void {

    // se tiver dia selecionado, remove classe
    if (this.selectedDay) {
      this.selectedDay.cssClass = this.selectedDay.cssClass.replace('clickedDay', '');
    }

    // chama função para exibir dica no dia selecionado caso tenha
    this.getData(day.date);

    // adiciona classe para o dia que foi clicado
    day.cssClass += ' clickedDay';

    // atribui o novo dia selecionado a variável
    this.selectedDay = day;
  }

  getMes(mes) {
    this.viewDate.setMonth(toInteger(mes))
    this.ref.markForCheck();
    this.refresh.next();
  }

  getAno(ano) {
    this.viewDate.setFullYear(toInteger(ano))
	  this.ref.markForCheck();
    this.refresh.next();
  }

}


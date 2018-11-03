import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SlimScrollDirective } from './directives/slim-scroll.directive';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { Component, Input } from '@angular/core';

import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MoodboardComponent } from './moodboard/moodboard.component';
import { PlanosComponent } from './planos/planos.component';
import { EmailsComponent } from './emails/emails.component';
import { LeftComponent } from './shared/left/left.component';
import { RightComponent } from './shared/right/right.component';
import { MuralComponent } from './mural/mural.component';
import { DicasComponent } from './dicas/dicas.component';
import { ElementosComponent } from './elementos/elementos.component';
import { HomeComponent } from './home/home.component';
import { TopoComponent } from './topo/topo.component';
import { MuralCarouselComponent } from './home/mural-carousel/mural-carousel.component';
import { LayoutComponent } from './layout/layout.component';
import { InternaComponent } from './interna/interna.component';
import { InternaDirective } from './interna/interna-host.directive';
import { InternaThumbsComponent } from './planos/interna-thumbs/interna-thumbs.component';
import { InternaElementosComponent } from './elementos/interna-elementos/interna-elementos.component';
import { InternaDicasComponent } from './dicas/interna-dicas/interna-dicas.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { InternaEmailComponent } from './emails/interna-email/interna-email.component';
import { InternaMoodboardComponent } from './moodboard/interna-moodboard/interna-moodboard.component';

registerLocaleData(localePt);

export const ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dicas', component: LayoutComponent },
	{ path: 'elementos', component: LayoutComponent },
	{ path: 'emails', component: LayoutComponent },
	{ path: 'moodboard', component: LayoutComponent },
	{ path: 'mural', component: LayoutComponent },
	{ path: 'planos', component: LayoutComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MoodboardComponent,
    PlanosComponent,
    EmailsComponent,
    MuralComponent,
    DicasComponent,
    ElementosComponent,
    HomeComponent,
    TopoComponent,
    MuralCarouselComponent,
    SlimScrollDirective,
    LayoutComponent,
    InternaComponent,
    InternaDirective,
    InternaThumbsComponent,
    InternaElementosComponent,
    InternaDicasComponent,
    LeftComponent,
    RightComponent,
    InternaEmailComponent,
    InternaMoodboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    NgbModule.forRoot(),
    HttpModule,
    PdfViewerModule,
    CalendarModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  exports: [
    AppComponent,
    MoodboardComponent,
    PlanosComponent,
    EmailsComponent,
    MuralComponent,
    DicasComponent,
    ElementosComponent,
    HomeComponent,
    TopoComponent,
    MuralCarouselComponent,
    SlimScrollDirective,
    LayoutComponent,
    InternaComponent,
    InternaDirective,
    LeftComponent,
    RightComponent
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [
      AppComponent,
    ]
})

export class AppModule {}
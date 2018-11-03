import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LayoutComponent } from './layout/layout.component'

export const ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dicas', component: LayoutComponent },
	{ path: 'elementos', component: LayoutComponent },
	{ path: 'emails', component: LayoutComponent },
	{ path: 'moodboard', component: LayoutComponent },
	{ path: 'mural', component: LayoutComponent },
	{ path: 'planos', component: LayoutComponent }
]
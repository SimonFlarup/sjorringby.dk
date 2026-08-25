import { Routes } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page.component';
import { ForsamlingPageComponent } from './pages/forsamling-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { KisPageComponent } from './pages/kis-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { OmkringPageComponent } from './pages/omkring-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'huset', component: ForsamlingPageComponent },
  { path: 'kis', component: KisPageComponent },
  { path: 'omkring', component: OmkringPageComponent },
  { path: 'kontakt', component: ContactPageComponent },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' }
];

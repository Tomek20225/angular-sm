import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { GlobalConstants } from './global-constants';
import { AccountComponent } from './components/pages/account/account.component';


const pageTitle:string = GlobalConstants.siteTitle;
const separator:string = '|';

function getPageTitle(title) {
  return `${title} ${separator} ${pageTitle}`;
}

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: pageTitle } },
  { path: 'logowanie', component: LoginComponent, data: { title: getPageTitle('Logowanie') } },
  { path: 'rejestracja', component: RegisterComponent, data: { title: getPageTitle('Rejestracja') } },
  { path: 'konto', component: AccountComponent, data: { title: getPageTitle('Moje konto') } },
  { path: '**', component: LoginComponent, data: { title: pageTitle } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

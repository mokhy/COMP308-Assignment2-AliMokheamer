import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MyResumeComponent } from './pages/my-resume/my-resume.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactsListComponent } from './contact-pages/contacts-list/contacts-list.component';
import { ContactsDetailsComponent } from './contact-pages/contacts-details/contacts-details.component';
import { ContactsDeleteComponent } from './contact-pages/contacts-delete/contacts-delete.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Welcome to my Home Page'}},
  {path: 'about', component: AboutComponent, data: {title: 'About Me'}},
  {path: 'projects', component: ProjectsComponent, data: {title: 'My Projects'}},
  {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
  {path: 'contact', component: ContactComponent, data: {title: 'Contact Me'}},
  {path: 'my-resume', component: MyResumeComponent},

  /* Secure Areas Routes */
  {path: 'contact/contacts', component: ContactsListComponent, data: {title: 'Contacts'}, canActivate: [AuthGuard]},
  {path: 'contact/contacts/add', component: ContactsDetailsComponent, data: {title: 'Add a Contact'}, canActivate: [AuthGuard]},
  {path: 'contact/contacts/edit/:id', component: ContactsDetailsComponent, data: {title: 'Edit Contact'}, canActivate: [AuthGuard]},
  {path: 'contact/contacts/delete/:id', component: ContactsDeleteComponent, canActivate: [AuthGuard]},

  /* Authorization Routes */
  {path: 'signup', component: SignupComponent, data: {title: 'Sign Up'}},
  {path: 'signin', component: SigninComponent, data: {title: 'Sign In'}},
  {path: 'signout', redirectTo: '/signin', pathMatch: 'full'},

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

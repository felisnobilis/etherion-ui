import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component'; // Import your components
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard'; // Import your authentication guard

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protected route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

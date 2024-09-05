import { Routes } from '@angular/router';
import { DefaultComponent } from './components/layouts/default/default.component';
import { MasterComponent } from './components/layouts/master/master.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { TodoComponent } from './modules/todo/todo.component';

export const routes: Routes = [
	{
		path: '',
		component: DefaultComponent,
		canActivate: [guestGuard],
		children: [
			{
				path: '',
				component: LoginComponent,
			},
			{
				path: 'register',
				component: RegisterComponent,
			},
		],
	},
	{
		path: '',
		component: MasterComponent,
		canActivate: [authGuard],
		children: [
			{
				path: 'todo',
				component: TodoComponent,
			},
		],
	},
];

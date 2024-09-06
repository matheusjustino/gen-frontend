import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// ROUTES
import { routes } from './app.routes';

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

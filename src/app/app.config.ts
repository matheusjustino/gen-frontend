import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

// ROUTES
import { routes } from './app.routes';

// PROVIDERS
import { CustomProviders } from './core/providers/custom.provider';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		importProvidersFrom(BrowserAnimationsModule),
		graphqlProvider,
		provideToastr(),
		CustomProviders,
	],
};

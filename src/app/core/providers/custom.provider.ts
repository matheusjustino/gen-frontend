import { Provider } from '@angular/core';

// ENUMS
import { ServiceProviderEnum } from '../enums/service-provider.enum';

// SERVICES
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';

export const CustomProviders: Provider[] = [
	{
		provide: ServiceProviderEnum.AUTH_SERVICE,
		useClass: AuthService,
	},
	{
		provide: ServiceProviderEnum.TODO_SERVICE,
		useClass: TodoService,
	},
];

import { Observable } from 'rxjs';

// MODELS
import { ILogin, IRegister } from '../models/auth.model';

export interface IAuthService {
	register(data: IRegister): Observable<void>;
	onLogin(data: ILogin): Observable<void>;
	onLogout(): void;
}

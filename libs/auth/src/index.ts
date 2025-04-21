import { AuthService } from './lib/auth/auth.service';
import { canActivateAuth } from './lib/auth/access.guard';
import { authTokenInterceptor } from './lib/auth/auth.interceptor';

export * from './lib/feature-login';
export { AuthService, canActivateAuth, authTokenInterceptor };

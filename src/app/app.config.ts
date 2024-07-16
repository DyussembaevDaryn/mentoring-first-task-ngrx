import {ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import * as userEffects from "./State/users.effects";
import {USERS_FEATURE_KEY, usersReducer} from "./State/users.reducer";
import {provideStore} from "@ngrx/store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore( {
        [USERS_FEATURE_KEY]: usersReducer
      }
    ),
    provideStoreDevtools(
      {
        maxAge: 25,
        logOnly: !isDevMode()
      }
    ),
    provideEffects(
      userEffects
    ),
  ]
};

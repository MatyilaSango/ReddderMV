import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bookmarkPostReducer } from './app/Store/Reducers/bookmark.reducer';
import { fullscreenPostReducer } from './app/Store/Reducers/fullscreenPost.reducer';
import { accountReducer } from './app/Store/Reducers/account.reducer';
import { searchAccountsReducer } from './app/Store/Reducers/search.reducer';
import { tabReducer } from './app/Store/Reducers/tab.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'account', reducer: accountReducer }),
    provideState({ name: 'bookmarks', reducer: bookmarkPostReducer }),
    provideState({ name: 'fullscreenPost', reducer: fullscreenPostReducer }),
    provideState({ name: 'searchAccounts', reducer: searchAccountsReducer }),
    provideState({ name: 'tab', reducer: tabReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ],
});
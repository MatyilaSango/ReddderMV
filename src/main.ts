import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideState, provideStore } from '@ngrx/store';
import { searchAccountReducer } from './app/states/search/search.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bookmarkPostReducer } from './app/states/bookmark/bookmark.reducer';
import { fullscreenPostReducer } from './app/states/fullscreenPost/fullscreenPost.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'searchAccount', reducer: searchAccountReducer }),
    provideState({ name: 'bookmarks', reducer: bookmarkPostReducer }),
    provideState({ name: 'fullscreenPost', reducer: fullscreenPostReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
});

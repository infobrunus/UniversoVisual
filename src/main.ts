import { enableProdMode, Provider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

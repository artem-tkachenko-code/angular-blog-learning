import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostComponent } from './shared/components/post/post.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { environment } from '../environments/environment';
import { TodoComponent } from './shared/components/todo/todo.component';

registerLocaleData(ruLocale, 'ru')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

var FirebaseConfig = {
  apiKey: "AIzaSyAwpl1MRXNR8JGJKoaL-BIE37DGyY1sMAo",
  authDomain: "angular-blog-artem.firebaseapp.com",
  databaseURL: "https://angular-blog-artem-default-rtdb.firebaseio.com",
  projectId: "angular-blog-artem",
  storageBucket: "angular-blog-artem.appspot.com",
  messagingSenderId: "607473306035",
  appId: "1:607473306035:web:2ebfc6b31a227b138523c6"
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }

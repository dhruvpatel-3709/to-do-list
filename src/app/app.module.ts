import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { AngularFireModule } from '@angular/fire';
import { FirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
      IonicModule.forRoot(),
       AppRoutingModule,
       BrowserAnimationsModule,
       MatButtonModule,
       MatFormFieldModule,
       NgbModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

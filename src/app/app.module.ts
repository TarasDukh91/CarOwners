import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnersListComponent } from './owners-list/owners-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateOwnerFormComponent } from './create-owner-form/create-owner-form.component';
import { EditOwnerFormComponent } from './edit-owner-form/edit-owner-form.component';
import { DataService } from "./services/data.service";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { OwnerDetailsComponent } from './owner-details/owner-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnersListComponent,
    CreateOwnerFormComponent,
    EditOwnerFormComponent,
    OwnerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

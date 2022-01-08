import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OwnersListComponent} from "./owners-list/owners-list.component";
import {EditOwnerFormComponent} from "./edit-owner-form/edit-owner-form.component";
import {CreateOwnerFormComponent} from "./create-owner-form/create-owner-form.component";
import {OwnerDetailsComponent} from "./owner-details/owner-details.component";

const routes: Routes = [
  { path: '', component: OwnersListComponent },
  { path: ':id/edit', component: EditOwnerFormComponent },
  { path: 'create', component: CreateOwnerFormComponent },
  { path: ':id/detail', component: OwnerDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

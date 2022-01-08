import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OwnerEntity, OwnersService} from "../services/owners.service";

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {
  public owner: OwnerEntity = { id: 0, aFirstName: '', aMiddleName: '', aLastName: '', aCars: [] }
  public carTableHeaders: string[] = ['Number', 'Production', 'Model', 'Year'];

  constructor(private activeRoute: ActivatedRoute, private ownersService: OwnersService) { }

  ngOnInit(): void {
    const id = +this.activeRoute.snapshot.params.id;
    this.ownersService.getOwnerById(id).subscribe(owner => {
      this.owner = owner;
      console.log(this.owner)
    })
  }

}

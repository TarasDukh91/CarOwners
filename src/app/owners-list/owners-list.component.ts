import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerEntity, OwnersService} from "../services/owners.service";
import {Observable} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";


@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss']
})
export class OwnersListComponent implements OnInit {
  @ViewChild('ownersRow') ownersRow: any;
  public selectedOwner: OwnerEntity = { id: 0, aFirstName: '', aLastName: '', aMiddleName: '', aCars: [] }
  public tableHeaders = ['Surname', 'Name', 'Parent Name', 'Cars']
  public owners: OwnerEntity[] = [];

  constructor(private ownersService: OwnersService, private router: Router) { }

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners() {
    this.ownersService.getOwners().subscribe(owners => this.owners = owners);
  }

  onOwnersRowClick(event: any, owner: OwnerEntity) {
    const id = +event.target.parentElement.id;
    this.ownersService.getOwners().subscribe(owners => {
      owners.forEach(owner => {
        if (owner.id === id) {
          this.selectedOwner = owner;
        }
      })
    })
  }

  onEditButtonClick() {
    this.router.navigate([this.selectedOwner.id + '/edit'])
  }

  onDeleteOwnerClick() {
    const ownerId = this.selectedOwner.id;
    this.ownersService.deleteOwner(+ownerId).subscribe();
    this.getOwners();
  }

  onViewOwnerButtonClick() {
    this.router.navigate([this.selectedOwner.id + '/detail'])
  }
}

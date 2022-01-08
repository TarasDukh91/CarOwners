import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, Validators} from "@angular/forms";
import {CreateOwnerFormComponent} from "../create-owner-form/create-owner-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CarEntity, OwnerEntity, OwnersService} from "../services/owners.service";

@Component({
  selector: 'app-edit-owner-form',
  templateUrl: './edit-owner-form.component.html',
  styleUrls: ['./edit-owner-form.component.scss']
})
export class EditOwnerFormComponent extends CreateOwnerFormComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public ownerService: OwnersService,
    public activeRoute: ActivatedRoute
  ) {
    super(formBuilder, router, ownerService, activeRoute)
  }

  ngOnInit(): void {
    const id = +this.activeRoute.snapshot.params.id;
    this.ownerService.getOwnerById(id).subscribe(owner => {
      const carControls = this.getCarsControls();
      carControls.clear();

      this.constructCarsControlGroups(owner.aCars, carControls)

      this.createOwnerForm.setValue({
        name: owner.aFirstName,
        secondName: owner.aLastName,
        parentName: owner.aMiddleName,
        cars: owner.aCars
      });
    });
  }

  onUpdateButtonClick() {
    const owner = this.createOwnerForm.value;
    const id = +this.activeRoute.snapshot.params.id;

    const updatedOwner: OwnerEntity = {
      id,
      aLastName: owner.secondName,
      aFirstName:owner.name,
      aMiddleName: owner.parentName,
      aCars: owner.cars
    }

    this.ownerService.editOwner(updatedOwner).subscribe(owner => {
      this.ownerService.getOwners();
    });
    this.router.navigate(['']);
  }

  constructCarsControlGroups(cars: CarEntity[], carsControls: FormArray) {
    cars.forEach(car => {
      const carControlGroup = this.formBuilder.group({
        number: [car.number, [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')], [this.carNumberValidator()]],
        production: [car.production],
        model: [car.model],
        year: [car.year, [Validators.required, Validators.maxLength(4)]]
      })
      carsControls.push(carControlGroup);
    })
  }

}

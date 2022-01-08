import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CarEntity, OwnerEntity, OwnersService} from "../services/owners.service";
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

@Component({
  selector: 'app-create-owner-form',
  templateUrl: './create-owner-form.component.html',
  styleUrls: ['./create-owner-form.component.scss']
})
export class CreateOwnerFormComponent implements OnInit {
  public cars: any;
  private carsData: CarEntity[] = [];
  public carsTableHeaders = ['Number', 'Production', 'Model', 'Year'];
  public id: number = 0;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public ownerService: OwnersService,
    public activatedRoute: ActivatedRoute) { }

  createOwnerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    secondName: ['', [Validators.required, Validators.minLength(4)]],
    parentName: [''],
    cars: this.formBuilder.array([this.createCarFormGroup()])
  })

  ngOnInit(): void {
    this.ownerService.getOwners().subscribe(owners => {
      const cars = owners.map(owner => owner.aCars);
      cars.forEach(car => {
        const cars: CarEntity[] = [];
        cars.push(...car);
        this.setCars(cars);
      })
    })
  }

  getCarForm() {
    return (<FormArray>this.createOwnerForm.get('cars')).controls;
  }

  createCarFormGroup(): FormGroup {
    return this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')], [this.carNumberValidator()]],
      production: [''],
      model: [''],
      year: ['', [Validators.required, Validators.maxLength(4)]]
    })
  }

  onOwnerSubmit(): void {
    const ownerData = this.createOwnerForm.value;
    const newOwner: OwnerEntity = {
      id: ownerData.id,
      aLastName: ownerData.secondName,
      aFirstName: ownerData.name,
      aMiddleName: ownerData.parentName,
      aCars: ownerData.cars
    }

    this.ownerService.createOwner({...newOwner}).subscribe(owner => {
      this.ownerService.getOwners();
    });
    this.router.navigate(['']);
  }

  onAddCar() {
    this.cars = this.getCarsControls();
    this.cars.push(this.createCarFormGroup());
  }

  onDeleteCarRow(index: number): void {
    this.cars = this.getCarsControls();
    this.cars.removeAt(index);
  }

  getCarsControls(): FormArray {
    return this.createOwnerForm.get('cars') as FormArray;
  }

  setCars(cars: CarEntity[]) {
    this.carsData.push(...cars);
  }

  checkCarsNumbers(value: string) {
    const carsNumbers = this.carsData.map(car => car.number);
    return of(!carsNumbers.includes(value)).pipe(delay(1000))
  }

  carNumberValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.checkCarsNumbers(control.value).pipe(
        map((res: boolean) => res ? null : { invalidAsync: true })
      )
    }
  }
}

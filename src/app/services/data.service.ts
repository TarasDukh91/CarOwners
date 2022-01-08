import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }

  createDb(): {} | Observable<{}> | Promise<{}> {
    return {
      owners: [
        {
          id: 1, aFirstName: 'Taras', aLastName: 'Dukh', aMiddleName: 'Bogdanvych', aCars: [
            {number: 'AH2345BC', production: 'BMW', model: 'E350', year: 2010}]
        },
        {
          id: 2, aFirstName: 'Halia', aLastName: 'Shostak', aMiddleName: 'Valentynivna', aCars: [
            {number: 'AH3395BC', production: 'Pegeout', model: '3005', year: 2014},
            {number: 'AH1365BC', production: 'Fiat', model: 'Scudo', year: 2016}]
        },
        {
          id: 3, aFirstName: 'Andriy', aLastName: 'Melnychuk', aMiddleName: 'Volodymyrovych', aCars: [
            {number: 'BC3396BC', production: 'Renault', model: 'Logan', year: 2017}]
        }
      ]
    }
  }
}

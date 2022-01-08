import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry, tap} from "rxjs/operators";

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;

  getOwnerById(aId: number): Observable<OwnerEntity>;

  createOwner(
   owner: OwnerEntity
  ): Observable<OwnerEntity>;

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;

  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}

export interface CarEntity {
  number: string,
  production: string,
  model: string,
  year: number
}

export interface OwnerEntity {
  id: number,
  aLastName: string,
  aFirstName: string,
  aMiddleName: string,
  aCars: CarEntity[]
}


@Injectable({
  providedIn: 'root'
})
export class OwnersService implements ICarOwnersService{
  private ownersUrl = 'api/owners/';

  constructor(private http: HttpClient) { }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.ownersUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(this.ownersUrl + aId);
  }

  createOwner(owner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.post<OwnerEntity>(this.ownersUrl, owner).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editOwner(owner: OwnerEntity): Observable<OwnerEntity> {
    console.log(owner)
    return this.http.put<OwnerEntity>(this.ownersUrl + owner.id, owner)
  }

  deleteOwner(ownerId: number): Observable<OwnerEntity[]> {
    return this.http.delete<OwnerEntity[]>(this.ownersUrl + ownerId);
  }
}

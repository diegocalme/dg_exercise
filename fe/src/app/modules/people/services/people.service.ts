import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Person } from '../types/person.type';
import { Observable, map } from 'rxjs';
import { PersonModel } from '../models/person.model';

@Injectable()
export class PeopleService {
  constructor(private readonly httpClient: HttpClient) {}

  public readonly peopleList$ = this.httpClient
    .get<Person[]>('http://localhost:8000/api/people')
    .pipe(
      map((people) =>
        people.map(
          ({ id, first_name, last_name, age, address, qrcode }) =>
            new PersonModel(id, first_name, last_name, age, address, qrcode)
        )
      )
    );

  public getPerson(id: string): Observable<PersonModel> {
    return this.httpClient
      .get<Person>(`http://localhost:8000/api/people/${id}`)
      .pipe(
        map(
          ({ id, first_name, last_name, age, address, qrcode }) =>
            new PersonModel(id, first_name, last_name, age, address, qrcode)
        )
      );
  }

  public createPeopleWithCsv(csvFile: Blob): Observable<PersonModel[]> {
    const formData = new FormData();

    formData.append('csv', csvFile);

    return this.httpClient
      .post<Person[]>('http://localhost:8000/api/people', formData, {
        headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
      })
      .pipe(
        map((people) =>
          people.map(
            ({ id, first_name, last_name, age, address, qrcode }) =>
              new PersonModel(id, first_name, last_name, age, address, qrcode)
          )
        )
      );
  }
}

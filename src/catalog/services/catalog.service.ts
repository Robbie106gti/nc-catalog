import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Catalog } from '../models/catalog.model';

@Injectable()
export class CatalogService {
  constructor() {}

  getBase(): Observable<Catalog[]> {
      const obj = {
          crudInfo: {
            createdAt: 'December 19, 2017 at 11:55:29 AM UTC-8',
            createdBy: 'Robert Leeuwerink',
            updateBy: 'Robert Leeuwerink',
            updatedAt: 'December 19, 2017 at 11:55:29 AM UTC-8'
        },
        id: '2ab0DAHoRVPacgNmgrd7',
        description: 'some information about general information',
        image: 'http://www.nickelscabinets.com/photographs/wp-content/uploads/2014/09/gloss-890x1024.jpg',
        tags: [],
        title: 'Vanity Channel Cabinets'
    };
    return of([ ...obj ]);
  }
}

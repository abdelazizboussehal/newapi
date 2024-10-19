import { TestBed } from '@angular/core/testing';

import { NewsapiCrudService } from './newsapi-crud.service';

describe('NewsapiCrudService', () => {
  let service: NewsapiCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsapiCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

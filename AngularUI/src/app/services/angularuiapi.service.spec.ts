import { TestBed } from '@angular/core/testing';

import { AngularUiApiService } from './angularuiapi.service';

describe('AngularuiapiService', () => {
  let service: AngularUiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularUiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

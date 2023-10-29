import { TestBed } from '@angular/core/testing';

import { GlobalstateserviceService } from './globalstateservice.service';

describe('GlobalstateserviceService', () => {
  let service: GlobalstateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalstateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { EosService } from './eos.service';

describe('EosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EosService]
    });
  });

  it('should be created', inject([EosService], (service: EosService) => {
    expect(service).toBeTruthy();
  }));
});

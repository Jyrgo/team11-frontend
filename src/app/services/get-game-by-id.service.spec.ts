import { TestBed } from '@angular/core/testing';

import { GetGameByIdService } from './get-game-by-id.service';

describe('GetGameByIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetGameByIdService = TestBed.get(GetGameByIdService);
    expect(service).toBeTruthy();
  });
});

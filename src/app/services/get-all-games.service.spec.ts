import { TestBed } from '@angular/core/testing';

import { GetAllGamesService } from './get-all-games.service';

describe('GetAllGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllGamesService = TestBed.get(GetAllGamesService);
    expect(service).toBeTruthy();
  });
});

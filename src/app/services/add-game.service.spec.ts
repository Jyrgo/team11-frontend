import { TestBed } from '@angular/core/testing';

import { AddGameService } from './add-game.service';

describe('AddGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddGameService = TestBed.get(AddGameService);
    expect(service).toBeTruthy();
  });
});

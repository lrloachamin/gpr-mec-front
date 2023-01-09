import { TestBed } from '@angular/core/testing';

import { OpcionesporperfilService } from './opcionesporperfil.service';

describe('OpcionesporperfilService', () => {
  let service: OpcionesporperfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionesporperfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

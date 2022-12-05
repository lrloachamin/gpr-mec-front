import { TestBed } from '@angular/core/testing';

import { UsuarioperfilService } from './usuarioperfil.service';

describe('UsuarioperfilService', () => {
  let service: UsuarioperfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioperfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

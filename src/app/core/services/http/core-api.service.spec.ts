import { TestBed } from '@angular/core/testing';
import { CoreApiService } from './core-api.service';
import { provideHttpClient } from '@angular/common/http';

describe('CoreApi', () => {
  let service: CoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CoreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

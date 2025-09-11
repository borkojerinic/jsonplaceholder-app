import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { httpErrorInterceptor } from './http-error-interceptor';
import { SnackBarService } from '@app-shared-services';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SnackBarType } from '@app-enums';

describe('httpErrorInterceptor', () => {
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => httpErrorInterceptor(req, next));

  beforeEach(() => {
    snackBarServiceSpy = jasmine.createSpyObj<SnackBarService>('SnackBarService', [
      'displaySnackBar',
    ]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SnackBarService,
          useValue: snackBarServiceSpy,
        },
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call SnackBarService on HTTP error', () => {
    http.get('/test-url').subscribe({
      next: () => fail('expected error, not success'),
      error: () => {
        expect(snackBarServiceSpy.displaySnackBar).toHaveBeenCalledWith(
          'Http failure response for /test-url: 500 Internal Server Error',
          SnackBarType.Error,
        );
      },
    });

    const req = httpMock.expectOne('/test-url');
    req.flush('error', { status: 500, statusText: 'Internal Server Error' });
  });
});

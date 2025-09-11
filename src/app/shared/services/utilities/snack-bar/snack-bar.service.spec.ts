import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarType } from '@app-enums';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: matSnackBarSpy }],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar.open with correct parameters', () => {
    const message = 'Test message';
    const type: SnackBarType = SnackBarType.Success;
    const duration = 3000;

    service.displaySnackBar(message, type, duration);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      duration,
      panelClass: [`mat-snack-bar-${type}`],
    });
  });

  it('should use default duration if not provided', () => {
    const message = 'Another message';
    const type: SnackBarType = SnackBarType.Error;

    service.displaySnackBar(message, type);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      duration: 5000,
      panelClass: [`mat-snack-bar-${type}`],
    });
  });
});

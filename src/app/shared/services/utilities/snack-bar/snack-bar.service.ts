import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarType } from '@app-enums';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Open material snack bar.
   *
   * @param message string
   * @param type SnackBarType
   * @param duration number
   *
   * @returns void
   */
  public displaySnackBar(message: string, type: SnackBarType, duration: number = 5000): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration,
      panelClass: [`mat-snack-bar-${type}`],
    };

    this.snackBar.open(message, 'Close', snackBarConfig);
  }
}

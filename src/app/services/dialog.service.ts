import {MatConfirmDialogComponent} from '../dialogs/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg): MatDialogRef<MatConfirmDialogComponent, any> {
   return this.dialog.open(MatConfirmDialogComponent, {
      disableClose: true,
      data : {
        message : msg
      }
    });
  }
}

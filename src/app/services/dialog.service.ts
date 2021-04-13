import {MatConfirmDialogComponent} from '../dialogs/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {MatPasswordDialogComponent} from '../dialogs/mat-password-dialog/mat-password-dialog.component';
import {MatColumnSelectDialogComponent} from '../dialogs/mat-column-select-dialog/mat-column-select-dialog.component';

// Сервис предназначенный для отображения разных диалогов пользователю
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

  openPasswordDialog(): MatDialogRef<MatPasswordDialogComponent, any> {
   return this.dialog.open(MatPasswordDialogComponent, {
      disableClose: true});
  }

  openColumnSelectDialog(displayedColumns: string[]): MatDialogRef<MatColumnSelectDialogComponent, any> {
   return this.dialog.open(MatColumnSelectDialogComponent, {
      disableClose: true, width: '60%', data: displayedColumns});
  }


}

import {Component, OnInit} from '@angular/core';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditBrandDialogComponent} from '../../dialogs/edit-brand-dialog/edit-brand-dialog.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'abbr'];
  dataSource: MatTableDataSource<Brand>;
  dialogConfig = new MatDialogConfig();

  constructor(private brandService: BrandService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dataSource = new MatTableDataSource<Brand>();
    this.brandService.findAll().subscribe(brands => {
      this.dataSource.data = brands;  // this forces mat-table to refresh data
    });
  }

  addBrand(): void {
    this.dialogConfig.data = new Brand(null, '', '');
    const dialogRef = this.dialog.open(EditBrandDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(brand => {
      if (brand) {
        this.brandService.add(brand).subscribe(() => this.reloadData(), error => this.reloadData());
      }
    });
  }

  editBrand(row): void {
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditBrandDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(brand => {
      if (brand) {
        if (typeof brand === 'string') {
          if (brand === 'delete') {
            this.brandService.delete(row.id).subscribe(() => this.reloadData(), error => this.reloadData());
          }
        } else {
          this.brandService.update(brand.id, brand).subscribe(() => this.reloadData(), error => this.reloadData());
        }
      } else {
        this.reloadData();
      }
    });
  }

  reloadData(): void {
    this.brandService.refresh().subscribe(brands => {
      this.dataSource.data = brands;  // this forces mat-table to refresh data
    });
  }

}

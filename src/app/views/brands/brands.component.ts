import {Component, OnInit} from '@angular/core';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';
import {MatDialog} from '@angular/material/dialog';
import {EditBrandDialogComponent} from '../../dialogs/edit-brand-dialog/edit-brand-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'abbr'];
  brands: Brand[];
  private selectedRow: null;
  private newBrand: Brand;

  constructor(private brandService: BrandService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.brandService.findAll().subscribe(onloadeddata => {
      this.brands = onloadeddata;
    });
  }

  addBrand(): void {
    this.newBrand = new Brand(null, '', '');
    const dialogRef = this.dialog.open(EditBrandDialogComponent, {data: this.newBrand});
    dialogRef.afterClosed().subscribe(brand => {
      if (brand) {
        this.brandService.add(brand).subscribe(onloadeddata => this.reloadData(), error => this.reloadData());
      }
    });
  }

  editBrand(row): void {
    console.log(row);
    this.selectedRow = row;
    const editedId = row.id;
    const dialogRef = this.dialog.open(EditBrandDialogComponent, {data: this.selectedRow});
    dialogRef.afterClosed().subscribe(brand => {
      if (brand) {
        if (typeof brand === 'string') {
          if (brand === 'delete') {
            this.brandService.delete(editedId).subscribe(() => this.reloadData(), error => this.reloadData());
          }
        } else {
          this.brandService.update(brand.id, brand).subscribe(() => this.reloadData(), error => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.brandService.refresh().subscribe(onloadeddata => {
      this.brands = onloadeddata;
    });
  }

}

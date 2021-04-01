import {Component, OnInit} from '@angular/core';
import {Shop} from '../../model/Shop';
import {ShopService} from '../../services/dao/impl/ShopService';
import {MatDialog} from '@angular/material/dialog';
import {EditShopDialogComponent} from '../../dialogs/edit-shop-dialog/edit-shop-dialog.component';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'abbr', 'brand'];
  shops: Shop[];
  private selectedRow: null;
  private newShop: Shop;

  constructor(private shopService: ShopService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.shopService.findAll().subscribe(onloadeddata => {
      this.shops = onloadeddata;
    });
  }

  addShop(): void {
    this.newShop = new Shop(null, '', '', null);
    const dialogRef = this.dialog.open(EditShopDialogComponent, {data: this.newShop});
    dialogRef.afterClosed().subscribe(shop => {
      if (shop) {
        this.shopService.add(shop).subscribe(onloadeddata => this.reloadData(), error => this.reloadData());
      }
    });
  }

  editShop(row): void {
    console.log(row);
    this.selectedRow = row;
    const editedId = row.id;
    const dialogRef = this.dialog.open(EditShopDialogComponent, {data: this.selectedRow});
    dialogRef.afterClosed().subscribe(shop => {
      if (shop) {
        if (typeof shop === 'string') {
          if (shop === 'delete') {
            this.shopService.delete(editedId).subscribe(() => this.reloadData(), error => this.reloadData());
          }
        } else {
          this.shopService.update(shop.id, shop).subscribe(() => this.reloadData(), error => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.shopService.refresh().subscribe(onloadeddata => {
      this.shops = onloadeddata;
    });
  }

}

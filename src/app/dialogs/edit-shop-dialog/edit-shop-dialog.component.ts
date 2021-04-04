import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Shop} from '../../model/Shop';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';

@Component({
  selector: 'app-edit-shop-dialog',
  templateUrl: './edit-shop-dialog.component.html',
  styleUrls: ['./edit-shop-dialog.component.css']
})
export class EditShopDialogComponent implements OnInit {

  shop: Shop;
  allBrands: Brand[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.shop = new Shop(this.data.id, this.data.name, this.data.abbr,
      this.data.brand);
    this.brandService.findAll().subscribe(onloadeddata => this.allBrands = onloadeddata);
  }

  compareFn(o1: any, o2: any): boolean {
    return (o1.id === o2.id);
  }
}

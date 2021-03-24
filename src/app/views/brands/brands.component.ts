import {Component, OnInit} from '@angular/core';
import {Brand} from '../../model/Brand';
import {Observable} from 'rxjs';
import {BrandService} from '../../services/dao/impl/BrandService';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: Observable<Brand[]>;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.brands = this.brandService.findAll();
  }

}

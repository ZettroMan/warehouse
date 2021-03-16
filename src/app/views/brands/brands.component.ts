import { Component, OnInit } from '@angular/core';
import {Brand} from '../../model/Brand';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: Brand[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.brandsSubject.subscribe(brands => this.brands = brands);
  }

}

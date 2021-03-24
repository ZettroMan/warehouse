import {Component, OnInit} from '@angular/core';
import {Shop} from '../../model/Shop';
import {Observable} from 'rxjs';
import {ShopService} from '../../services/dao/impl/ShopService';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: Observable<Shop[]>;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shops = this.shopService.findAll();
  }

}

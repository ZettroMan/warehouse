import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Shop} from '../../model/Shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: Shop[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.shopsSubject.subscribe(shops => this.shops = shops);
  }

}

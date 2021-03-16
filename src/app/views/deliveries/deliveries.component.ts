import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  deliveries: Observable<Delivery[]>;

  constructor(private ds: DeliveryService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  private reloadData(): void {
    this.deliveries = this.ds.findAll();
  }
}

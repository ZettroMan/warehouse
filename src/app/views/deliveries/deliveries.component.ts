import {Component, OnInit, ViewChild} from '@angular/core';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {EditDeliveryDialogComponent} from '../../dialogs/edit-delivery-dialog/edit-delivery-dialog.component';
import {DateAdapter} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  displayedColumns: string[] = ['No', 'id', 'deliveryDate', 'deliveryTime', 'carInfo', 'driverInfo', 'brand', 'orderNumber',
    'deliveryType', 'sender', 'comment', 'shop', 'numberOfPlaces', 'torgNumber', 'invoice', 'warehouse'];
  dataSource = new MatTableDataSource<Delivery>();
  dialogConfig = new MatDialogConfig();
  private currentUser: User;
  displayedColumns2: string[];
  searchKey = '';
  startDate  = new Date();
  endDate = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  range = new FormGroup({
    start: new FormControl(this.startDate),
    end: new FormControl(this.endDate)
  });

  constructor(private deliveryService: DeliveryService,
              private userService: UserService,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('ru-RU');
    this.endDate.setMonth(this.startDate.getMonth() + 1);

  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '60%';
    this.dialogConfig.height = 'auto';

    this.userService.findAll().subscribe(() => {
      this.currentUser = this.userService.getCurrentUser();
    });
    this.deliveryService.findByDateRange(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(deliveries => {
      console.log(deliveries);
      this.dataSource.data = deliveries;  // this forces mat-table to refresh data
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'deliveryTime':
            return item.deliveryTime.deliveryTime;
          case 'brand':
            return item.brand.name;
          case 'deliveryType':
            return item.deliveryType.type;
          case 'shop':
            return item.shop.name;
          case 'warehouse':
            return item.warehouse.name;
          default:
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Поставок на странице:';
    });
  }

  addDelivery(): void {
    this.dialogConfig.data = new Delivery(null, new Date(), null, '', '',
      null, '', null, '', '', null, '',
      '', '', this.currentUser, null);
    const dialogRef = this.dialog.open(EditDeliveryDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(delivery => {
      if (delivery) {
        this.deliveryService.add(delivery).subscribe(() => this.reloadData(), () => this.reloadData());
      }
    });
  }

  editDelivery(row): void {
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditDeliveryDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(delivery => {
      if (delivery) {
        if (typeof delivery === 'string') {
          if (delivery === 'delete') {
            this.deliveryService.delete(row.id).subscribe(() => this.reloadData(), () => this.reloadData());
          }
        } else {
          this.deliveryService.update(delivery.id, delivery).subscribe(() => this.reloadData(), () => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.deliveryService.findByDateRange(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(deliveries => {
      this.dataSource.data = deliveries;  // this forces mat-table to refresh data
      // console.log(deliveries);
      });
  }

 loadToExcel(): void {
    this.deliveryService.loadToExcel(this.dataSource.filteredData, this.displayedColumns);
  }

  resetDateFilter(): void {
    this.range.controls.start.setValue(this.startDate);
    this.range.controls.end.setValue(this.endDate);
    this.reloadData();
  }
}


// Прочие фрагменты кода использовавшиеся ранее

// resetFilter(): void {
//   this.searchKey = '';
//   this.applyFilter();
// }

// this.dataSource.filterPredicate = (data) => {
//   return (data.deliveryDate >= (this.range.controls.start.value as Date)) &&
//     (data.deliveryDate <= (this.range.controls.end.value as Date));
// };

// это из FilterPredicate

// return this.displayedColumns.some(ele => {
//   console.log(ele);
//   if (ele === 'No') {
//     return false;
//   }
//   console.log(ele);
//   if (typeof data[ele] === 'string') {
//     return data[ele].toLowerCase().indexOf(filter) !== -1;
//   }
//   return false;
// });


// startDate = new Date();
// endDate = new Date(this.startDate.getDate() + 21);
// startDate: any;
// endDate: any;

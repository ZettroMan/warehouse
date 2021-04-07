import {Component, OnInit, ViewChild} from '@angular/core';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';
import {MatTableDataSource} from '@angular/material/table';
import {DeliveryDto} from '../../model/DeliveryDto';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {EditDeliveryDialogComponent} from '../../dialogs/edit-delivery-dialog/edit-delivery-dialog.component';
import {DateAdapter} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

// ----------------------------
  dataToSend: DeliveryDto[];
  stringRows: string[];

// ----------------------------

  constructor(private deliveryService: DeliveryService,
              private userService: UserService,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('ru-RU');
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '60%';
    this.dialogConfig.height = 'auto';

    this.userService.findAll().toPromise().then(() => {
      this.currentUser = this.userService.getCurrentUser();
    });
    this.deliveryService.findAll().subscribe(deliveries => {
      // console.log(deliveries);
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
      this.dataSource.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          console.log(ele);
          if (ele === 'No') {
            return false;
          }
          console.log(ele);
          if (typeof data[ele] === 'string') {
            return data[ele].toLowerCase().indexOf(filter) !== -1;
          }
          return false;
        });
      };
    });
    const title = 'Дата прибытия на склад\tПлановое время прибытия на склад\tМарка и номер ТС\tФИО водителя, телефон\tБренд\tВЗ\t' +
      'Тип поставки\tПоставщик\tКомментарий\tМагазин\tКол-во мест\t№ Торг\t№ счет-фактуры';
    this.displayedColumns2 = title.split('\t');
  }

  addDelivery(): void {
    this.dialogConfig.data = new Delivery(null, new Date(), null, '', '',
      null, '', null, '', '', null, '',
      '', '', this.currentUser, null);
    const dialogRef = this.dialog.open(EditDeliveryDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(delivery => {
      if (delivery) {
        this.deliveryService.add(delivery).subscribe(() => this.reloadData(), error => this.reloadData());
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
            this.deliveryService.delete(row.id).subscribe(() => this.reloadData(), error => this.reloadData());
          }
        } else {
          this.deliveryService.update(delivery.id, delivery).subscribe(() => this.reloadData(), error => this.reloadData());
        }
      }
    });
  }


  private reloadData(): void {
    this.deliveryService.refresh().subscribe(deliveries => {
      this.dataSource.data = deliveries;  // this forces mat-table to refresh data
    });
  }

  // ---------------------------------------------------------
  data(event: ClipboardEvent): void {
    this.stringRows = [];
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const rowData = pastedText.split('\n');
    const data = [];

    rowData.forEach(rd => {
      const row = {};
      this.displayedColumns.forEach((a, index) => {
        row[a] = rd.split('\t')[index];
      });
      data.push(row);
    });
    this.stringRows = rowData;
    //   this.dataSource = new MatTableDataSource(data);
  }

  sendDeliveriesEvent(): void {
    console.log(this.tableToDeliveries(this.stringRows));
    const delivery: Delivery[] = [];
    // console.log(this.dataToSend.length);
    // for (let i = 0; i < this.dataToSend.length; i++) {
    //   delivery.push(this.dataToSend[i].buildDelivery(this.dataToSend[i]));
    // }
    console.log(delivery);
    // this.deliveryService.add(delivery[0]);
    //  this.dataSource = null;
    this.reloadData();
  }

  tableToDeliveries(data: string[]): DeliveryDto[] {
    this.dataToSend = [];
    for (let i = 0; i < data.length - 1; i++) {
      const delivery: DeliveryDto = new DeliveryDto();
      // Разбиваем строковое значение даты по точкам и указываем значения явно в объект Date
      const rowData = data[i].split('\t');
      // const date: Date = new Date();
      // // const partsOfDate = data[0].split('.');
      // // date.setDate(Number(partsOfDate[0]));
      // // date.setMonth(Number(partsOfDate[1]));
      // // date.setFullYear(Number(partsOfDate[2]));
      // console.log(date);
      delivery.deliveryDate = rowData[0];
      // Закончили с датой, заполняем остальные поля
      delivery.deliveryTime = rowData[1];
      delivery.carInfo = rowData[2];
      delivery.driverInfo = rowData[3];
      delivery.brand = rowData[4];
      delivery.orderNumber = rowData[5];
      delivery.deliveryType = rowData[6];
      delivery.sender = rowData[7];
      delivery.comment = rowData[8];
      delivery.shop = rowData[9];
      delivery.numberOfPlaces = rowData[10];
      delivery.torgNumber = rowData[11];
      delivery.invoice = rowData[12];
      this.dataToSend.push(delivery);
    }
    return this.dataToSend;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  resetFilter(): void {
    this.searchKey = '';
    this.applyFilter();
  }
}

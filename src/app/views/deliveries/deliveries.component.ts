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
import {DeliveryTypeService} from '../../services/dao/impl/DeliveryTypeService';
import {DeliveryTimeService} from '../../services/dao/impl/DeliveryTimeService';
import {WarehouseService} from '../../services/dao/impl/WarehouseService';
import {ShopService} from '../../services/dao/impl/ShopService';
import {BrandService} from '../../services/dao/impl/BrandService';
import {DeliveryType} from '../../model/DeliveryType';
import {DeliveryTime} from '../../model/DeliveryTime';
import {Warehouse} from '../../model/Warehouse';
import {Shop} from '../../model/Shop';
import {Brand} from '../../model/Brand';
import {NgForm} from '@angular/forms';

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
  pasteTableDisplayedColumns: string[] = ['deliveryDate', 'deliveryTime', 'carInfo', 'driverInfo', 'brand', 'orderNumber',
    'deliveryType', 'sender', 'comment', 'shop', 'numberOfPlaces', 'torgNumber', 'invoice', 'warehouse'];
  pasteTableDataSource = new MatTableDataSource<Delivery>();
  todaysDate: any;
// ----------------------------
  allBrands: Brand[];
  allShops: Shop[];
  allWarehouses: Warehouse[];
  allTimes: DeliveryTime[];
  allTypes: DeliveryType[];


  constructor(private deliveryService: DeliveryService,
              private userService: UserService,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>,
              private brandService: BrandService,
              private shopService: ShopService,
              private warehouseService: WarehouseService,
              private deliveryTimeService: DeliveryTimeService,
              private deliveryTypeService: DeliveryTypeService) {
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
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const rowData = pastedText.split('\n');
    const dataObject = [];

    rowData.forEach(rd => {
      if (rd !== '') {
        const row = {};
        this.pasteTableDisplayedColumns.forEach((a, index) => {
          // Идекс =4 , это столбец с названием бренда (делаем так, чтобы можно было вводить бренд большими и мал. буквами
          if (index === 4) {
            row[a] = rd.toUpperCase().split('\t')[index];
          } else {
            row[a] = rd.split('\t')[index];
          }
        });
        dataObject.push(row);
      }
    });
    this.pasteTableDataSource = new MatTableDataSource(dataObject);
    console.log(this.pasteTableDataSource);
  }

  send(form: NgForm): void {
    if (form.valid) {
      const deliveries: Delivery[] = this.tableToDeliveries(this.pasteTableDataSource);
      console.log(deliveries);
      this.deliveryService.addAll(deliveries).subscribe((data: boolean) => {
        if (data) {
          this.reloadData();
        }
        console.log(data);
      }, error => this.reloadData());
    }
  }

  tableToDeliveries(table: MatTableDataSource<Delivery>): Delivery[] {
    let delivery: Delivery;
    const deliveriesToSend: Delivery[] = [];
    for (let i = 0; i < table.data.length; i++) {
      console.log('prepare to send data: ');
      delivery = new Delivery(
        null,
        this.toDate(String(table.data[i].deliveryDate)),
        table.data[i].deliveryTime,
        table.data[i].carInfo,
        table.data[i].driverInfo,
        new Brand(null, '', String(table.data[i].brand)),
        table.data[i].orderNumber,
        new DeliveryType(null, String(table.data[i].deliveryType)),
        table.data[i].sender,
        table.data[i].comment,
        new Shop(null, String(table.data[i].shop), '', null),
        table.data[i].numberOfPlaces,
        table.data[i].torgNumber,
        table.data[i].invoice,
        this.currentUser,
        new Warehouse(null, String(table.data[i].warehouse), ''));
      deliveriesToSend.push(delivery);
    }
    return deliveriesToSend;
  }

  toDate(stringDate: string): Date {
    const dateParts = stringDate.split('.');
    const date = new Date(Number(dateParts[2]), Number(dateParts[1]), Number(dateParts[0]));
    return date;
  }

  compareFn(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return (o1.id === o2.id);
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  resetFilter(): void {
    this.searchKey = '';
    this.applyFilter();
  }
}

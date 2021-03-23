import {Component, OnInit} from '@angular/core';
import {Brand} from './model/Brand';
import {Warehouse} from './model/Warehouse';
import {Shop} from './model/Shop';
import {User} from './model/User';
import {Delivery} from './model/Delivery';
import {DeliveryService} from './services/dao/impl/DeliveryService';
import {MatDialog} from '@angular/material/dialog';
import {BrandService} from './services/dao/impl/BrandService';
import {WarehouseService} from './services/dao/impl/WarehouseService';
import {ShopService} from './services/dao/impl/ShopService';
import {UserService} from './services/dao/impl/UserService';
import {Role} from './model/Role';
import {DeliveryTime} from './model/DeliveryTime';
import {DeliveryType} from './model/DeliveryType';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // тип устройства - на будущее
  isMobile: boolean;
  isTablet: boolean;

  title = 'warehouse';

  // параметры бокового меню с категориями
  menuOpened = true;  // по умолчанию - открыто

  // Основные сущности
  brands: Brand[];          // бренды
  warehouses: Warehouse[];  // склады
  shops: Shop[];            // магазины
  users: User[];            // пользователи
  deliveries: Delivery[];   // поставки
  roles: Role[];            // роли пользователей
  deliveryTimes: DeliveryTime[];  // время доставки
  deliveryTypes: DeliveryType[];  // тип поставки

  // TODO - здесь надо будет потом вставить SearchValues для тех сущностей, по которым нужно осуществлять поиск

  // TODO - потом сюда еще можно будет добавить DeviceDetectorService и IntroService
  constructor(
    private brandService: BrandService,
    private warehouseService: WarehouseService,
    private shopService: ShopService,
    private userService: UserService,
    private deliveryService: DeliveryService,
    private dialog: MatDialog      // работа с диалоговыми окнами
  ) {
  }

  ngOnInit(): void {
    this.fillBrands();
    this.fillWarehouses();
    this.fillRoles();
    this.fillDeliveryTimes();
    this.fillDeliveryTypes();
    this.fillShops();
    this.fillUsers();
    this.fillDeliveries();
  }


  fillBrands(): void {
    this.brandService.findAll().subscribe(result => {
      this.brands = result;
    });
  }

  fillWarehouses(): void {
    this.warehouseService.findAll().subscribe(result => {
      this.warehouses = result;
    });
  }

  fillRoles(): void {
    this.roles.push(new Role(1, 'ADMIN'));
    this.roles.push(new Role(2, 'WAREHOUSE'));
    this.roles.push(new Role(3, 'BRAND_MANAGER'));
    // this.roleService.findAll().subscribe(result => {
    //   this.warehouses = result;
    // });
  }

  fillDeliveryTimes(): void {
    this.deliveryTimes.push(new DeliveryTime(1, 'MORNING'));
    this.deliveryTimes.push(new DeliveryTime(2, 'AFTERNOON'));
    this.deliveryTimes.push(new DeliveryTime(3, 'WHOLE_DAY'));
  }

  fillDeliveryTypes(): void {
    this.deliveryTypes.push(new DeliveryType(1, 'WAREHOUSE'));
    this.deliveryTypes.push(new DeliveryType(2, 'CROSS-DOCKING'));
  }

  fillShops(): void {
    this.shopService.findAll().subscribe(result => {
      this.shops = result;
    });
  }

  fillUsers(): void {
    this.userService.findAll().subscribe(result => {
      this.users = result;
    });
  }

  fillDeliveries(): void {
    this.deliveryService.findAll().subscribe(result => {
      this.deliveries = result;
    });
  }


}

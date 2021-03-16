import {DeliveryDto} from './DeliveryDto';

export class Delivery {
  id: number;
  deliveryDate: Date;    // только дата, без времени
  deliveryTime: string;  // по факту - Enum
  carInfo: string;
  driverInfo: string;
  brand: string;
  orderNumber: string;
  deliveryType: string;    // по факту - Enum
  sender: string;
  comment: string;
  shop: string;
  numberOfPlaces: string;
  torgNumber: string;
  invoice: string;

  // user: string;


  constructor(id: number, deliveryDate: Date, deliveryTime: string, carInfo: string, driverInfo: string,
              brand: string, orderNumber: string, deliveryType: string, sender: string, comment: string,
              shop: string, numberOfPlaces: string, torgNumber: string, invoice: string) {
    this.id = id;
    this.deliveryDate = deliveryDate;
    this.deliveryTime = deliveryTime;
    this.carInfo = carInfo;
    this.driverInfo = driverInfo;
    this.brand = brand;
    this.orderNumber = orderNumber;
    this.deliveryType = deliveryType;
    this.sender = sender;
    this.comment = comment;
    this.shop = shop;
    this.numberOfPlaces = numberOfPlaces;
    this.torgNumber = torgNumber;
    this.invoice = invoice;
    // this.user = user;
  }
}

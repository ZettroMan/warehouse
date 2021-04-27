import {Role} from './Role';
import {Brand} from './Brand';
import {Warehouse} from './Warehouse';

export class User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  brands: Brand[];
  roles: Role[];
  warehouse: Warehouse;


  constructor(id: number, username: string, password: string, fullName: string, email: string,
              phone: string, brands: Brand[], roles: Role[], warehouse: Warehouse) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.brands = brands;
    this.roles = roles;
    this.warehouse = warehouse;
  }
}

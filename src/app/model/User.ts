
export class User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;

  constructor(id: number, username: string, fullName: string, email: string, phone: string, role: string) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }
}

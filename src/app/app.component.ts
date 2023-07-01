import { Component } from '@angular/core';
import data from '../data/user.json';

export interface User {
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  department: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front';
  users: User[] = [];
  opened: boolean[] = [];
  ngOnInit() {
    this.users = data.data;
    this.users = this.users.map((d, id) => {
      this.opened.push(false);
      return { ...d, id };
    });
  }

  search_query = '';

  expand(row_id: any) {
    this.opened[row_id] = !this.opened[row_id];
  }

  submit() {
    this.opened = [];
    if (this.search_query.length) {
      this.users = data.data.filter((f) => {
        const pattern = new RegExp(`${this.search_query}`, 'gmi');
        return pattern.test(f.name) || pattern.test(f.email);
      });
    } else this.users = data.data;
    this.users = this.users.map((d, id) => {
      this.opened.push(false);
      return {
        ...d,
        id,
      };
    });
  }
}

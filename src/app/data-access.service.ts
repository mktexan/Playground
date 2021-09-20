// YOU CAN NOT CHANGE THIS FILE

import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export interface OrderSummary {
  id: string;
  buyerEmail: string;
  buyerFullName: string;
  status: 'received' | 'processing' | 'shipped';
}
const data: OrderSummary[] = [
  { id: '1', buyerEmail: 'sam@test.com', buyerFullName: 'Sam Johnson', status: 'shipped' },
  { id: '2', buyerEmail: 'susan@test.com', buyerFullName: 'Susan Thompson', status: 'processing' },
  { id: '3', buyerEmail: 'tammy@test.com', buyerFullName: 'Tammy Empson', status: 'received' },
];

const itemsData: { [id: string]: OrderItem[] } = {
  '1': [
    { productName: 'Red Sock', productPrice: 11.23, quantity: 1 },
    { productName: 'Blue Sock', productPrice: 12.33, quantity: 2 },
  ],
  '2': [
    { productName: 'Red Hat', productPrice: 21.23, quantity: 1 },
    { productName: 'Black Pants', productPrice: 41.23, quantity: 1 },
  ],
  '3': [
    { productName: 'Green Sweater', productPrice: 31.23, quantity: 1 },
    { productName: 'Yellow Bag', productPrice: 71.23, quantity: 1 },
  ],
};

export interface OrderItem {
  productName: string;
  productPrice: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class DataAccessService {
  constructor(private authS: AuthenticationService) {}

  async orderList(): Promise<OrderSummary[] | undefined> {
    if (await this.authS.currentUser()) {
      return data;
    } else {
      return undefined;
    }
  }

  async orderDetails(orderId: string): Promise<OrderItem[] | undefined> {
    if (await this.authS.currentUser()) {
      return itemsData[orderId];
    } else {
      return undefined;
    }
  }
}

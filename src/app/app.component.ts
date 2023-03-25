import { Component, OnInit } from '@angular/core';
import { ItemService } from './services/item.service';
import { Item } from 'src/models/item';
import { BuffItem } from 'src/models/buffitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'InvestChecker';

  newItem: string = '';
  list: Item[] = [];

  totalAfterTax = 0;
  totalProfit = 0;
  totalItemCount = 0;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getSavedList();
    this.itemService.items.subscribe({
      next: (items) => {
        items = items.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.list = items;
        this.totalAfterTax = 0;
        this.totalProfit = 0;
        this.totalItemCount = 0;
        this.list.forEach((item) => {
          this.totalAfterTax +=
            parseFloat(item.amount) *
            (parseFloat(item.steam_price) * (1 - parseFloat(item.tax) / 100));
          this.totalProfit +=
            parseFloat(item.amount) *
              (parseFloat(item.steam_price) *
                (1 - parseFloat(item.tax) / 100)) -
            parseFloat(item.buyPrice) * parseFloat(item.amount);
          this.totalItemCount += parseInt(item.amount);
        });
      },
    });
  }

  addItemToList() {
    const itemCode = parseInt(this.newItem);
    if (itemCode && !this.list.find((i) => i.code == itemCode)) {
      this.itemService.getItem(itemCode).subscribe({
        next: (item) => {
          this.list.push(item);
          this.newItem = '';
          this.itemService.saveList(this.list);
        },
      });
    }
  }

  removeItemFromList(item: string) {
    const itemCode = parseInt(item);
    const index = this.list.findIndex((i) => i.code == itemCode);
    if (itemCode && index !== -1) {
      this.list.splice(index, 1);
      this.itemService.saveList(this.list);
    }
  }

  updateItemList() {
    this.itemService.saveList(this.list);
  }
}

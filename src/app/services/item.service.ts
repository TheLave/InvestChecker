import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuffItem } from 'src/models/buffitem';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items = new BehaviorSubject<Item[]>([]);

  constructor(private http: HttpClient) {}

  getSavedList() {
    const lastUpdate = parseInt(localStorage.getItem('lastUpdate') || '0');
    const savedList = localStorage.getItem('savedList');
    let items: Item[] = [];
    if (savedList) {
      items = JSON.parse(savedList);
    } else {
      this.items.next([]);
    }

    if (lastUpdate !== 0 && Date.now() - lastUpdate > 300000) {
      let itemsChecked = 0;
      let updatedItems: Item[] = [];
      for (let item of items) {
        this.getItem(item.code).subscribe({
          next: (updatedItem) => {
            updatedItem.amount = item.amount;
            updatedItem.buyPrice = item.buyPrice;
            updatedItem.tax = item.tax;
            updatedItems.push(updatedItem);
            this.items.next(updatedItems);
            itemsChecked++;
            if (itemsChecked === items.length) {
              this.saveList(updatedItems);
            }
          },
          error: () => {
            updatedItems.push(item);
            this.items.next(updatedItems);
            itemsChecked++;
            if (itemsChecked === items.length) {
              this.saveList(updatedItems);
            }
            console.log(
              'Error while fetching data from Buff, falling back to cached data'
            );
          },
        });
      }
    } else {
      this.items.next(items);
    }
  }

  saveList(list: Item[]) {
    localStorage.setItem('savedList', JSON.stringify(list));
    localStorage.setItem('lastUpdate', JSON.stringify(Date.now()));
    this.items.next(list);
  }

  getItemData(code: number) {
    return this.http.get<BuffItem>(
      `http://${environment.apiUrl}/buffitem?itemcode=${code}`
    );
  }

  getItem(code: number) {
    return this.getItemData(code).pipe(
      map((buffItem) => {
        let item: Item = {
          name: buffItem.data.goods_infos[code.toString()].market_hash_name,
          code: code,
          steam_price: buffItem.data.goods_infos[code.toString()].steam_price,
          original_icon_url:
            buffItem.data.goods_infos[code.toString()].original_icon_url,
          items: buffItem.data.items,
          buyPrice: '0',
          amount: '0',
          tax: '13',
        };
        return item;
      })
    );
  }
}

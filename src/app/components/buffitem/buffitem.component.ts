import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-buffitem',
  templateUrl: './buffitem.component.html',
  styleUrls: ['./buffitem.component.scss'],
})
export class BuffitemComponent implements OnInit {
  @Input() item!: Item;
  @Output() onRemove = new EventEmitter<string>();
  @Output() onSave = new EventEmitter();
  hover = false;
  listingsOpen = false;

  constructor() {}

  ngOnInit(): void {
    this.calculateInvestmentValues();
  }

  toggleListings() {
    this.listingsOpen = !this.listingsOpen;
  }

  calculateSaleAfterTax() {
    this.item.saleAfterTax =
      parseFloat(this.item.steam_price) * (1 - parseFloat(this.item.tax) / 100);
    return this.item.saleAfterTax;
  }

  calculateProfit() {
    this.item.profit =
      this.calculateSaleAfterTax() - parseFloat(this.item.buyPrice);
    return this.item.profit;
  }

  calculateTotalPrice() {
    this.item.totalPrice =
      parseFloat(this.item.buyPrice) * parseFloat(this.item.amount);
    return this.item.totalPrice;
  }

  calculateTotalSaleAfterTax() {
    this.item.totalSaleAfterTax =
      parseFloat(this.item.amount) * this.calculateSaleAfterTax();
    return this.item.totalSaleAfterTax;
  }

  calculateOverallProfit() {
    this.item.overallProfit =
      this.calculateTotalSaleAfterTax() - this.calculateTotalPrice();
    return this.item.overallProfit;
  }

  calculateInvestmentValues() {
    this.calculateSaleAfterTax();
    this.calculateProfit();
    this.calculateTotalPrice();
    this.calculateTotalSaleAfterTax();
    this.calculateOverallProfit();
  }

  saveItem() {
    this.onSave.emit();
  }
}

export type Item = {
  name: string;
  code: number;
  steam_price: string;
  original_icon_url: string;
  items: {
    price: string;
    lowest_bargain_price: string;
  }[];
  buyPrice: string;
  amount: string;
  tax: string;
  saleAfterTax?: number;
  profit?: number;
  totalPrice?: number;
  totalSaleAfterTax?: number;
  overallProfit?: number;
};

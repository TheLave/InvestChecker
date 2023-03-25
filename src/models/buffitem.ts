export type BuffItem = {
  data: {
    goods_infos: {
      [key: string]: {
        goods_id: number;
        market_hash_name: string;
        name: string;
        steam_price: string;
        steam_price_cny: string;
        original_icon_url: string;
      };
    };
    items: {
      price: string;
      lowest_bargain_price: string;
    }[];
  };
};

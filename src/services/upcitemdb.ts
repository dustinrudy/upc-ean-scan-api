import UpcitemdbConfig from "../config/upcitemdb";
import axios from "axios";

export interface Offers {
  merchant: string;
  domain: string;
  title: string;
  currency: string;
  list_price: number;
  price: number;
  shipping: string;
  condition: string;
  availability: string;
  link: string;
  updated_t: number;
}

export interface Product {
  ean: string;
  title: string;
  upc: string;
  description: string;
  brand: string;
  model: string;
  size: string;
  dimension: string;
  weight: string;
  category: string;
  currency: string;
  lowest_recorded_price: number;
  highest_recorded_price: number;
  images: string[];
  offers: Offers[];
  asin?: string;
  elid?: string;
  gtin?: string;
}

export async function fetchUpcData(upc: string): Promise<Product> {
  try {
    const endpoint = `${UpcitemdbConfig.BASE_URL}/prod/trial/lookup?upc=${upc}`;
    const response = await axios.get(endpoint);

    const data = response.data;

    if (data.items.length === 0) {
      throw new Error(`No results found for UPC: ${upc}`);
    }

    const { code, total, offset, ...restData } = data.items[0];

    const item: Product = { ...restData };

    return item;
  } catch (error) {
    throw error;
  }
}
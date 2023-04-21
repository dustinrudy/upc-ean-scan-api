import mongoose, { Schema, Model, Types } from "mongoose";
import { Offers } from "../services/upcitemdb";

interface ItemDocument {
  upc: number;
  userId: Types.ObjectId;
  ean: string;
  title: string;
  description: string;
  brand: string;
  model: string;
  color: string;
  size: string;
  dimension: string;
  category: string;
  weight: string;
  currency: string;
  lowest_recorded_price: number;
  highest_recorded_price: number;
  images: Types.Array<string>;
  asin: string;
  elid: string;
  gtin: string;
  offers: Offers[];
}

const offerSchema = new Schema<Offers>({
  merchant: String,
  domain: String,
  title: String,
  currency: String,
  list_price: Number,
  price: Number,
  shipping: String,
  condition: String,
  availability: String,
  link: String,
  updated_t: Number
});

const itemSchema = new Schema<ItemDocument, Model<ItemDocument>>(
  {
    upc: String,
    userId: Types.ObjectId,
    ean: String,
    title: String,
    description: String,
    brand: String,
    model: String,
    color: String,
    size: String,
    dimension: String,
    category: String,
    weight: String,
    currency: String,
    lowest_recorded_price: Number,
    highest_recorded_price: Number,
    asin: String,
    elid: String,
    gtin: String,
    images: [String],
    offers: [offerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);

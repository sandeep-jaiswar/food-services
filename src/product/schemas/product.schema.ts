import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});

ProductSchema.set('timestamps', true);

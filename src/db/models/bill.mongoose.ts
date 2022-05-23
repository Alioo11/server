import mongoose from "mongoose";
var Schema = mongoose.Schema;
var bill = new Schema({
  date_from: {
    type: Date,
    required: true,
  },
  date_to: {
    type: Date,
    required: true,
  },
  issue_date: {
    type: Date,
    required: true,
  },
  dead_line_date: {
    type: Date,
    required: true,
  },
  is_paid: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  bill_id: {
    type: String,
    required: true,
  },
  main_price: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  previus_debt_price: {
    type: Number,
    required: true,
  },
  consumtion_amount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Bill", bill);

import mongoose from "mongoose";
var Schema = mongoose.Schema;
var payment = new Schema({
  amount_paid: {
    type: Number,
    required: true,
  },
  is_paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  family: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "family",
  },
  bill: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "bill",
  },
});

export default mongoose.model("Payment", payment);

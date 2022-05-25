import mongoose from "mongoose";

var Schema = mongoose.Schema;
var family = new Schema({
  family_name: {
    type: String,
    required: true,
  },
  date_from: {
    type: Date,
    required: true,
  },
  date_to: {
    type: Date,
    required: false,
    default: null,
  },
  absent_days: [
    {
      type: Date,
      required: true,
    },
  ],
  members_count: {
    type: Number,
    required: true,
  },
  house: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "house",
  },
  payment: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "payment",
    },
  ],
});

export default mongoose.model("Family", family);

import mongoose from "mongoose";

var Schema = mongoose.Schema;
var family = new Schema({
  unit_name: {
    type: Number,
    required: true,
  },
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
    required: true,
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
});

export default mongoose.model("Family", family);

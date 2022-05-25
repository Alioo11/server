import mongoose from "mongoose";
var Schema = mongoose.Schema;
var house = new Schema({
  area: {
    type: Number,
  },
  is_empty: {
    type: Boolean,
    required: true,
  },
  unit_name: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("House", house);

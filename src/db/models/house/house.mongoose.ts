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
  family: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "family",
  },
});

export default mongoose.model("House", house);

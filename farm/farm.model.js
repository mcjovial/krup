const { Schema, model } = require("mongoose");

const farmSchema = new Schema(
  {
    farmer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    crop: { type: Schema.Types.ObjectId, ref: "Crop", required: true },
    location: { type: String, required: true },
    ph: { type: Number, required: true },
    nitrogen: { type: Number, required: true },
    potassium: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    soil_moisture: { type: Number, required: true },
  },
  { timestamps: true }
);

const Farm = model("Farm", farmSchema);

module.exports = Farm;

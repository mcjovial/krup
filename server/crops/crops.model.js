const { Schema, model } = require("mongoose");

const cropSchema = new Schema(
  {
    name: { type: String, required: true },
    ph: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    nitrogen: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    potassium: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    phosphorus: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    soil_moisture: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    }
  },
  { timestamps: true }
);

const Crop = model("Crop", cropSchema);

module.exports = Crop;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    contact: { type: Number, unique: true },
    role: {
      type: String,
      enum: ["admin", "patron"],
      required: true,
    },
    location: String,
  },
  { timestamps: true }
);

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.password;
  },
});

const User = mongoose.model("User", schema);

module.exports = User;

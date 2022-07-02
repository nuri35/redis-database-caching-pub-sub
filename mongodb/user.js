const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Types } = Schema;
const bcrypt = require("bcrypt");

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
    collection: "users",
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

UsersSchema.pre("save", async function preSave(next) {
  if (this.isNew) {
    try {
      console.log("password converting into hash");
      this.password = await bcrypt.hash(this.password, 10);
      return next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;

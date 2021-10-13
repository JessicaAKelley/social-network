const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    isUnique: true,
    required: "Username is required",
    trim: true,
  },
  email: {
    type: String,
    required: "Email is required",
    isUnique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  thoughts: [
    {
      type: "ObjectId",
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: "ObjectId",
      ref: "User",
    },
  ],
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;

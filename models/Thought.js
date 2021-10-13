const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "Please enter text!",
    minLength: [1, "A minimum of 1 character is required!"],
    maxLength: [280, "Text cannot exceed 280 characters."],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    get: (now) => {
      const month = now.getMonth();
      const day = now.getDate();
      const year = now.getFullYear();
      let hour = now.getHours();
      const minute = now.getMinutes();
      let ampm;
      if (hour > 12) {
        ampm = "pm";
        hour -= 12;
      } else {
        ampm = "am";
      }

      const timestamp = `${month}/${day}/${year} ${hour}:${minute}${ampm}`;

      return timestamp;
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: "ObjectId",
      ref: "reactionSchema",
    },
  ],
});

ThoughtSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
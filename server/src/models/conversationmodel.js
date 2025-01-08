const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default:[],
      },
    ],
  },
  { timestamps: true }
);

const conversation = mongoose.model('conversation', conversationSchema);
module.exports = conversation

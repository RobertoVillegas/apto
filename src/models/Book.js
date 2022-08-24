import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    datePublished: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Book", bookSchema);

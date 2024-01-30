import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,   
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },

  }, { timestamps: true} );

export default mongoose.model("Products", productSchema);

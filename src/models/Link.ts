import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  link: { type: String, required: true },
});

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
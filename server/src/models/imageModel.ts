import mongoose from "mongoose";

export interface imageDoc extends mongoose.Document {
  data: Buffer;
  contentType: string;
  text: String;
}

const imgSchema = new mongoose.Schema<imageDoc>({
  data: Buffer,
  contentType: String,
  text: String,
});

const model = mongoose.model("Image", imgSchema);

export default model;

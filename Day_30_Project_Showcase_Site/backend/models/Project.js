import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],
  github: String,
  liveDemo: String,
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
